// src/controllers/reportController.ts
import { Request, Response } from 'express';
import Borrow from '../models/Borrow'; // Import your Borrow model
import Book from '../models/Book'; // Import your Book model
import { knexInstance as knex } from '../database'; // Import your Knex instance

// Get a report of currently borrowed books
export const getBorrowedBooksReport = async (req: Request, res: Response) => {
  try {
    // Fetch borrowed books with returnDate as NULL
    const borrowedBooks = await knex('borrows')
      .whereNull('returnDate') // Knex way to check for NULL values
      .select('*');

    res.status(200).json({ success: true, borrowedBooks });
  } catch (error) {
    console.error('Error fetching borrowed books report:', error);
    res.status(500).json({ message: 'Failed to fetch borrowed books report.' });
  }
};

// Get a report of the most popular books
export const getPopularBooksReport = async (req: Request, res: Response) => {
  try {
    const popularBooks = await knex('borrows')
      .select('bookId')
      .count('* as borrowCount') // Count the number of borrows per book
      .groupBy('bookId') // Group by bookId to aggregate the count
      .orderBy('borrowCount', 'desc') // Order by borrow count in descending order
      .limit(10) // Limit to the top 10 popular books
      .join('books', 'borrows.bookId', '=', 'books.id') // Join with the books table to get additional details
      .select('books.title', 'books.author'); // Select the desired book attributes

    res.status(200).json({ success: true, popularBooks });
  } catch (error) {
    console.error('Error fetching popular books report:', error);
    res.status(500).json({ message: 'Failed to fetch popular books report.' });
  }
};
