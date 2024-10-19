// src/routes/reportRoutes.ts
import express from 'express';
import { getBorrowedBooksReport, getPopularBooksReport } from '../controllers/reportController';
import { authenticateJWT } from '../middleware/authMiddleware'; // Import your authentication middleware
import adminMiddleware from '../middleware/adminMiddleware';

const router = express.Router();

// GET /api/reports/borrowed
router.get('/borrowed', authenticateJWT, adminMiddleware, getBorrowedBooksReport);

// GET /api/reports/popular
router.get('/popular', authenticateJWT, adminMiddleware, getPopularBooksReport);

export default router;
