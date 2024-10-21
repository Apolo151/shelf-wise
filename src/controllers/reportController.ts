// src/controllers/reportController.ts
import { Request, Response } from 'express';
import Borrow  from '../models/Borrow'; // Import your Borrow model
import  Book  from '../models/Book'; // Import your Book model
import { sequelize } from '../models/index';
import { Op, Sequelize } from 'sequelize';

// Get a report of currently borrowed books
export const getBorrowedBooksReport = async (req: Request, res: Response) => {
  try {
    // Fetch borrowed books with returnDate as NULL
    const borrowedBooks = await Borrow.findAll({
      where: { returnDate: { [Op.is]: Sequelize.literal('NULL') }},
    });

    res.status(200).json({sucess: true, borrowedBooks});
  } catch (error) {
    console.error('Error fetching borrowed books report:', error);
    res.status(500).json({ message: 'Failed to fetch borrowed books report.' });
  }
};

// Get a report of the most popular books
export const getPopularBooksReport = async (req: Request, res: Response) => {
  try {
    const popularBooks = await Borrow.findAll({
      attributes: ['bookId', [sequelize.fn('COUNT', sequelize.col('bookId')), 'borrowCount']],
      group: ['bookId', 'book.id'], // Include book.id in the group clause
      order: [['borrowCount', 'DESC']],
      include: [
        {
          model: Book,
          as: 'book', // Use the alias defined in the association
          attributes: ['title', 'author'],
        },
      ],
      limit: 10, // You can adjust this limit based on your requirements
    });

    res.status(200).json(popularBooks);
  } catch (error) {
    console.error('Error fetching popular books report:', error);
    res.status(500).json({ message: 'Failed to fetch popular books report.' });
  }
};
