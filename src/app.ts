// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
// Import routes
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';
import reportRoutes from './routes/reportRoutes';

import { ErrorHandler } from './middleware/errorHandler';
import { setupSwagger } from './utils/swagger';

import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', borrowRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use(ErrorHandler);

setupSwagger(app);

export default app;
