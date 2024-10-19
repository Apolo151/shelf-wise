// src/routes/userRoutes.ts
import express from 'express';
import { registerUser, loginUser } from '../controllers/userController'; // Import user controller functions
import { authenticateJWT } from '../middleware/authMiddleware'; // Import JWT middleware
import { validateUserRegistration } from '../middleware/validationMiddleware';

const router = express.Router();

// User Registration
router.post('/register', registerUser);

// User Login
router.post('/login', loginUser);

export default router;
