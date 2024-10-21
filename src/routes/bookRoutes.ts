// src/routes/bookRoutes.ts
import express from 'express';
import { addBook, updateBook, deleteBook, getBooks } from '../controllers/bookController'; // Import book controller functions
import { authenticateJWT } from '../middleware/authMiddleware'; // Import JWT middleware
import adminMiddleware from '../middleware/adminMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API to manage books in the library.
 */

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "The Great Gatsby"
 *                   author:
 *                     type: string
 *                     example: "F. Scott Fitzgerald"
 */
router.get('/', getBooks);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Book Title"
 *               author:
 *                 type: string
 *                 example: "Author Name"
 *     responses:
 *       201:
 *         description: Book added successfully.
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *       403:
 *         description: Forbidden - Admin access required.
 */
router.post('/', authenticateJWT, adminMiddleware, addBook);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Book Title"
 *               author:
 *                 type: string
 *                 example: "Updated Author Name"
 *     responses:
 *       200:
 *         description: Book updated successfully.
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *       404:
 *         description: Book not found.
 */
router.put('/:id', authenticateJWT, updateBook);


// Delete a book by ID (admin only)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully.
 *       401:
 *         description: Unauthorized - JWT token is missing or invalid.
 *       404:
 *         description: Book not found.
 */
router.delete('/:id', authenticateJWT, adminMiddleware, deleteBook);

export default router;
