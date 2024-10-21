// src/controllers/reportController.ts
import { Request, Response } from 'express';
import { knexInstance as knex } from '../database';

// Get a report of currently borrowed books
export const getBorrowedBooksReport = async (req: Request, res: Response) => {
  try {
    // Fetch borrowed books with returnDate as NULL
    const borrowedBooks = await knex('borrows')
      .whereNull('returnDate') // Filter only borrowed books
      .select('bookId') // Select only the bookId to count borrows
      .count('* as borrowCount') // Count how many times each book has been borrowed
      .groupBy('bookId'); // Group by bookId

    // Fetch additional details about each book, including available copies
    const bookDetails = await Promise.all(
      borrowedBooks.map(async (borrowedBook) => {
        const book = await knex('books')
          .where({ id: borrowedBook.bookId })
          .select('title', 'author') // Select relevant book attributes
          .first();

        const availableCopies = await knex('books')
          .where({ id: borrowedBook.bookId })
          .select('availableCopies')
          .first();

        return {
          ...book,
          borrowCount: borrowedBook.borrowCount as number,
          availableCopies: availableCopies?.copies || 0, // Default to 0 if no copies found
        };
      })
    );

    res.status(200).json({ success: true, borrowedBooks: bookDetails });
  } catch (error) {
    console.error('Error fetching borrowed books report:', error);
    res.status(500).json({ message: 'Failed to fetch borrowed books report.' });
  }
};


// Get a report of the most popular books
export const getPopularBooksReport = async (req: Request, res: Response) => {
  try {
    const popularBooks = await knex('borrows')
      .select('books.id as bookId', 'books.title', 'books.author')
      .count('* as borrowCount') // Count the number of borrows per book
      .join('books', 'borrows.bookId', '=', 'books.id') // Join with the books table to get additional details
      .groupBy('books.id', 'books.title', 'books.author') // Group by bookId and other selected fields
      .orderBy('borrowCount', 'desc') // Order by borrow count in descending order
      .limit(10); // Limit to the top 10 popular books

    res.status(200).json({ success: true, popularBooks });
  } catch (error) {
    console.error('Error fetching popular books report:', error);
    res.status(500).json({ message: 'Failed to fetch popular books report.' });
  }
};

