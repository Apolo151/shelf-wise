// src/routes/bookRoutes.ts
import express from 'express';
import { addBook, updateBook, deleteBook, getBooks } from '../controllers/bookController'; // Import book controller functions
import { authenticateJWT } from '../middleware/authMiddleware'; // Import JWT middleware
import adminMiddleware from '../middleware/adminMiddleware';

const router = express.Router();

// Retrieve list of available books
router.get('/', getBooks);

// Add a new book (admin only)
router.post('/', authenticateJWT, adminMiddleware, addBook);

// Update book details (admin only)
router.put('/:id', authenticateJWT, updateBook);

// Delete a book by ID (admin only)
router.delete('/:id', authenticateJWT, adminMiddleware, deleteBook);

export default router;
