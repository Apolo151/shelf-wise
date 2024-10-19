// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    next();
  }
  try {
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
      req.body.user = {
        id: decoded.id,
        role: decoded.role
      }
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
      next(error);
    }
};
