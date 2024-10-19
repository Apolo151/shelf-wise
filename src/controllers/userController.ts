// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User'; // Import the User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const newUser = await User.create({ name, email, password: hashedPassword, role: "user" }); // Create user
    res.status(201).json({ success: true, user: newUser }); // Send response
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Error creating user', error });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } }); // Find user by email
    if (user && await bcrypt.compare(password, user.password)) { // Compare passwords
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' }); // Generate JWT
      res.json({ success: true, token }); // Send token
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' }); // Unauthorized
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login error', error });
  }
};

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.body.id); // Get user by ID from token
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user profile', error });
  }
};
