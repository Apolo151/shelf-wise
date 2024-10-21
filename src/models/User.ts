// src/models/User.ts
import {knexInstance as knex} from '../database'; // Import your Knex instance

export interface UserAttributes {
  id: number;
  full_name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface UserCreationAttributes {
  full_name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

class User {
  // Create a new user
  static async create(userData: UserCreationAttributes): Promise<UserAttributes> {
    const [user] = await knex('users').insert(userData).returning('*');
    return user;
  }

  // Find a user by ID
  static async findById(id: number): Promise<UserAttributes | undefined> {
    return await knex('users').where({ id }).first();
  }

  // Find a user by email
  static async findByEmail(email: string): Promise<UserAttributes | undefined> {
    return await knex('users').where({ email }).first();
  }

  // Get all users
  static async findAll(): Promise<UserAttributes[]> {
    return await knex('users').select('*');
  }

  // Update a user
  static async update(id: number, userData: Partial<UserCreationAttributes>): Promise<number> {
    return await knex('users').where({ id }).update(userData);
  }

  // Delete a user
  static async delete(id: number): Promise<number> {
    return await knex('users').where({ id }).del();
  }

  // Delete all users
  static async destroy(): Promise<void> {
    await knex('users').del();
  }
}

export default User;