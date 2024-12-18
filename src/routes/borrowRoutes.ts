import express from 'express';
import { borrowBook, returnBook, getBorrowHistory } from '../controllers/borrowController';
import { authenticateJWT } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Borrow
 *   description: API for borrowing and returning books, and viewing borrowing history.
 */

/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book borrowed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book borrowed successfully."
 *       400:
 *         description: Bad request. Invalid book ID or other issue.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 */
router.post('/borrow', authenticateJWT, borrowBook);

/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrow]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Book returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book returned successfully."
 *       400:
 *         description: Bad request. Invalid book ID or other issue.
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 */
router.post('/return', authenticateJWT, returnBook);

/**
 * @swagger
 * /borrow/history:
 *   get:
 *     summary: Retrieve borrowing history for the logged-in user
 *     tags: [Borrow]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: "1984"
 *                   borrowedAt:
 *                     type: string
 *                     format: date
 *                     example: "2024-01-10"
 *                   returnedAt:
 *                     type: string
 *                     format: date
 *                     example: "2024-02-10"
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 */
router.get('/borrow/history', authenticateJWT, getBorrowHistory);

export default router;
