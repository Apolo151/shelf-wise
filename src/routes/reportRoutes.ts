// src/routes/reportRoutes.ts
import express from 'express';
import { getBorrowedBooksReport, getPopularBooksReport } from '../controllers/reportController';
import { authenticateJWT } from '../middleware/authMiddleware'; // Import your authentication middleware
import adminMiddleware from '../middleware/adminMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API for fetching reports on borrowed and popular books.
 */

/**
 * @swagger
 * /reports/borrowed:
 *   get:
 *     summary: Get a report of borrowed books
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A report of borrowed books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBorrowed:
 *                   type: integer
 *                   example: 150
 *                 borrowedBooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "The Great Gatsby"
 *                       borrowCount:
 *                         type: integer
 *                         example: 20
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       403:
 *         description: Forbidden. Only admins are allowed to access this endpoint.
 */
router.get('/borrowed', authenticateJWT, adminMiddleware, getBorrowedBooksReport);

/**
 * @swagger
 * /reports/popular:
 *   get:
 *     summary: Get a report of popular books
 *     tags: [Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A report of popular books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalBooks:
 *                   type: integer
 *                   example: 10
 *                 popularBooks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "To Kill a Mockingbird"
 *                       borrowCount:
 *                         type: integer
 *                         example: 35
 *       401:
 *         description: Unauthorized. JWT token is missing or invalid.
 *       403:
 *         description: Forbidden. Only admins are allowed to access this endpoint.
 */
router.get('/popular', authenticateJWT, adminMiddleware, getPopularBooksReport);

export default router;
