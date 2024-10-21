// src/controllers/bookController.ts
import { Request, Response } from 'express';
import Book  from '../models/Book';

// Retrieve all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll(); // Use repository to get all books
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching books', error });
  }
};

// Add a new book (admin only)
export const addBook = async (req: Request, res: Response) => {
  const { title, author, genre, availableCopies } = req.body;

  try {
    const newBook = await Book.create({
      title,
      author,
      genre,
      availableCopies: availableCopies || 1, // Default to 1 if not provided
    });
    res.status(201).json({ success: true, book: newBook });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding book', error });
  }
};

// Update a book (admin only)
export const updateBook = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { title, author, genre, availableCopies } = req.body;

  try {
    const updated = await Book.update(Number(id), {
      title,
      author,
      genre,
      availableCopies,
    });

    if (updated) {
      const updatedBook = await Book.findById(Number(id));
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
    const deleted = await Book.delete(Number(id)); // Use repository to delete book
    if (deleted) {
      res.status(200).json({ success: true, message: 'Book deleted' });
    } else {
      res.status(404).json({ success: false, message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting book', error });
  }
};
