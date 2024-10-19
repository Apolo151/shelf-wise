// src/controllers/reportController.ts
import { Request, Response } from 'express';
import Borrow  from '../models/Borrow'; // Import your Borrow model
import  Book  from '../models/Book'; // Import your Book model
import { sequelize } from '../models/database';

// Get a report of currently borrowed books
export const getBorrowedBooksReport = async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await Borrow.findAll({
      include: [
        {
          model: Book,
          attributes: ['title', 'author'], // Adjust based on your Book model attributes
        },
      ],
    });

    res.status(200).json(borrowedBooks);
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
      group: ['bookId'],
      order: [['borrowCount', 'DESC']],
      include: [
        {
          model: Book,
          attributes: ['title', 'author'], // Adjust based on your Book model attributes
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
