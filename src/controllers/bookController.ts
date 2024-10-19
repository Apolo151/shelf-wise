// src/controllers/bookController.ts
import { Request, Response } from 'express';
import Book  from '../models/Book'; // Import the Book model

// Retrieve all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll(); // Get all books
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching books', error });
  }
};

// Add a new book (admin only)
export const addBook = async (req: Request, res: Response) => {
  const { title, author, isbn } = req.body;

  try {
    const newBook = await Book.create({ title, author , availableCopies:0}); // Create book
    res.status(201).json({ success: true, book: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding book', error });
  }
};

// Update a book (admin only)
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, isbn } = req.body;

  try {
    const [updated] = await Book.update({ title, author}, { where: { id } }); // Update book
    if (updated) {
      const updatedBook = await Book.findByPk(id); // Get updated book
      res.json({ success: true, book: updatedBook });
    } else {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating book', error });
  }
};

// Delete a book (admin only)
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleted = await Book.destroy({ where: { id } }); // Delete book
    if (deleted) {
      res.json({ success: true, message: 'Book deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting book', error });
  }
};