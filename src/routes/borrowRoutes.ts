// src/routes/borrowRoutes.ts
import express from 'express';
import { borrowBook, returnBook, getBorrowHistory } from '../controllers/borrowController'; // Import borrow controller functions
import { authenticateJWT } from '../middleware/authMiddleware'; // Import JWT middleware

const router = express.Router();

// Borrow a book
router.post('/borrow', authenticateJWT, borrowBook);

// Return a borrowed book
router.put('/return', authenticateJWT, returnBook);

// Retrieve borrowing history for the logged-in user
router.get('/borrow/history', authenticateJWT, getBorrowHistory);

export default router;
