// src/middleware/validationMiddleware.ts
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateUserRegistration = [
  body('full_name').isString().withMessage('Full name is required'),
  body('email').isEmail().withMessage('Email is required and should be valid'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateBookData = [
  body('title').isString().withMessage('Title is required'),
  body('author').isString().withMessage('Author is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];