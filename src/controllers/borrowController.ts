// src/controllers/borrowController.ts
import { Request, Response } from 'express';
import Borrow from '../models/Borrow'; // Import the Borrow model
import  Book  from '../models/Book'; // Import the Book model
import  User  from '../models/User'; // Import the User model

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    const book = await Book.findByPk(bookId); // Find the book
    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    const newBorrow = await Borrow.create({ userId: req.body.id, bookId, borrowDate: new Date() }); // Create borrow record
    res.status(201).json({ success: true, borrow: newBorrow });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error borrowing book', error });
  }
  return Promise.resolve();
};

// Return a borrowed book
export const returnBook = async (req: Request, res: Response) => {
  const { bookId } = req.body;

  try {
    // update the return date of the book
    const [updated] = await Borrow.update({ returnDate: new Date() }, { where: { userId: req.body.id, bookId} });

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
