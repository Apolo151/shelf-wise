// src/app.ts
import express from 'express';
import { sequelize } from './models/database';
// Import routes
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import borrowRoutes from './routes/borrowRoutes';

import { ErrorHandler } from './middleware/errorHandler';
import dotenv from 'dotenv';
import reportRoutes from './routes/reportRoutes';
import envFilePath from './config/env-config';

dotenv.config({ path: envFilePath });

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

// Database synchronization
sequelize.sync()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection error:', error));

export default app;
