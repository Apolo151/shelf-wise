import { Request, Response, NextFunction } from "express";

// src/middleware/authMiddleware.ts
const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    // Assuming req.user contains the user info
    if (!req.body || req.body.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admins only.' });
      return;
    }
    next();
  };
  
  export default adminMiddleware;
  