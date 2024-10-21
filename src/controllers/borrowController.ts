// src/controllers/borrowController.ts
import { Request, Response } from 'express';
import Borrow from '../models/Borrow'; // Import the Knex-based Borrow model
import Book from '../models/Book'; // Import the Book model

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId); // Use a method to find the book by ID
    if (!book || book.availableCopies === undefined) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }
    if (book.availableCopies !== 0 && book.availableCopies !== undefined) {
      // Create borrow record
      const newBorrow = await Borrow.create(
        {
          userId: req.body.user.id,
          bookId,
          borrowDate: new Date(),
        }
      ); 
      // Use update method to decrease available copies
      await Book.update(bookId, { availableCopies: book.availableCopies - 1 }); 
      res.status(200).json({ success: true, borrowId: newBorrow.id });
    }
    else{
      res.status(400).json({ success: false, message: 'Book is not available' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error borrowing book', error });
  }
};

// Return a borrowed book
export const returnBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book || book === undefined) {
      res.status(404).json({ success: false, message: 'Book not found' });
      return;
    }

    // Check if the user has borrowed the book
    const borrowed = await Borrow.findByUserId(req.body.user.id); // Get all borrows for user
    const userBorrowedBook = borrowed.find(b => b.bookId === bookId && !b.returnDate);
    if (!userBorrowedBook) {
      res.status(400).json({ success: false, message: 'You have not borrowed this book' });
      return;
    }

    // Update the return date of the borrow record
    await Borrow.update(userBorrowedBook.id, { returnDate: new Date() });

    // Update available copies of the book
    await Book.update(bookId, { availableCopies: book.availableCopies + 1 }); // Use update method to increase available copies
    res.json({ success: true, message: 'Book returned successfully' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error returning book', error });
  }
};

// Get borrowing history for logged-in user
export const getBorrowHistory = async (req: Request, res: Response) => {
  try {
    const history = await Borrow.findByUserId(req.body.user.id); // Get borrowing history for the user
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching borrowing history', error });
  }
};
