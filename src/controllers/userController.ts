// src/controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User'; // Import the Knex-based User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  const { full_name, email, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Check if the email already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(400).json({ success: false, message: 'Email already registered' });
      return;
    }
    // Create a new user
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
      role: 'user', // Default role is 'user'
    });

    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error creating user', error });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Login error', error });
  }
};
