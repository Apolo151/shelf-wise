// src/models/Borrow.ts
import { knexInstance as knex } from '../database'; // Import your Knex instance

export interface BorrowAttributes {
  id: number;
  borrowDate: Date;
  returnDate?: Date;
  userId: number;
  bookId: number;
}

export interface BorrowCreationAttributes {
  borrowDate: Date;
  returnDate?: Date;
  userId: number;
  bookId: number;
}

class Borrow {
  // Create a new borrow record
  static async create(borrowData: BorrowCreationAttributes): Promise<BorrowAttributes> {
    const [borrow] = await knex('borrows').insert(borrowData).returning('*');
    return borrow;
  }

  // Find a borrow record by ID
  static async findById(id: number): Promise<BorrowAttributes | undefined> {
    return await knex('borrows').where({ id }).first();
  }

  // Find all borrows for a specific user
  static async findByUserId(userId: number): Promise<BorrowAttributes[]> {
    return await knex('borrows').where({ userId });
  }

  // Find all borrows for a specific book
  static async findByBookId(bookId: number): Promise<BorrowAttributes[]> {
    return await knex('borrows').where({ bookId });
  }

  // Update a borrow record (e.g., returning a book)
  static async update(id: number, borrowData: Partial<BorrowCreationAttributes>): Promise<number> {
    return await knex('borrows').where({ id }).update(borrowData);
  }

  // Delete a borrow record
  static async delete(id: number): Promise<number> {
    return await knex('borrows').where({ id }).del();
  }

  // Delete all borrow records
  static async destroy(): Promise<void> {
    await knex('borrows').del();
  }
}

export default Borrow;