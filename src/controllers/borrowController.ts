// src/controllers/borrowController.ts
import { Request, Response } from 'express';
import Borrow from '../models/Borrow'; // Import the Borrow model
import  Book  from '../models/Book'; // Import the Book model
import { Op, Sequelize } from 'sequelize';

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findByPk(bookId); // Find the book
    if (!book || book.availableCopies === undefined) {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
    if (book?.availableCopies === 0) {
      res.status(400).json({ success: false, message: 'Book is not available' });
    }
    const borrowObj = {
      userId: req.body.user.id,
      bookId,
      borrowDate: new Date()
    }
    const newBorrow = await Borrow.create(borrowObj); // Create borrow record
    if (book && book.availableCopies !== undefined) {
      await Book.update({ availableCopies: book.availableCopies - 1 }, { where: { id: bookId } }); // Update available copies
    }
    res.status(200).json({ success: true, borrowId: newBorrow.id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error borrowing book', error });
  }
};

// Return a borrowed book
export const returnBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    // check if book exists
    const book = await Book.findByPk(bookId);
    if (!book) {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
    // check if the user has borrowed the book
    const borrowed = await Borrow.findOne({ where: { userId: req.body.user.id, bookId } });
    if (!borrowed) {
      res.status(400).json({ success: false, message: 'You have not borrowed this book' });
    }
    // update the return date of the book (filter by userId, bookId, and returnDate is null)
    const updated = await Borrow.update({ returnDate: new Date() }, { where: { userId: req.body.user.id, bookId, returnDate: { [Op.is]: Sequelize.literal('NULL') } } });
    // update available copies of the book
    if (book && book.availableCopies !== undefined) {
      await Book.update({ availableCopies: book.availableCopies + 1 }, { where: { id: bookId } });
    }
    if (updated[0] === 0) {
      res.status(200).json({ success: true, message: 'Book has already been returned' });
    }
    res.json({ success: true, message: 'Book returned successfully' });

  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Error returning book', error });
  }
};

// Get borrowing history for logged-in user
export const getBorrowHistory = async (req: Request, res: Response) => {
  try {
    const history = await Borrow.findAll({ where: { userId: req.body.id }, include: [Book] }); // Get borrowing history
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching borrowing history', error });
  }
};
