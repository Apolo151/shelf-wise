// repositories/BookRepository.ts
import { Knex } from 'knex';
import { knexInstance as knex} from '../database'; // Assuming you export a Knex instance

interface Book {
  id?: number;
  title: string;
  author: string;
  genre?: string;
  availableCopies: number;
}

class Book {
  static async create(bookData: Partial<Book>): Promise<Book> {
    const [book] = await knex('books').insert(bookData).returning('*');
    return book;
  }

  static async findAll(): Promise<Book[]> {
    return knex('books').select('*');
  }

  static async findById(id: number): Promise<Book | null> {
    const book = await knex('books').where({ id }).first();
    return book || null;
  }

  static async update(id: number, bookData: Partial<Book>): Promise<number> {
    return knex('books').where({ id }).update(bookData);
  }

  static async delete(id: number): Promise<number> {
    return knex('books').where({ id }).del();
  }

  static async destroy(): Promise<void> {
    await knex('books').delete;
  }

  static async findWithBorrows(bookId: number): Promise<Book & { borrows: any[] } | null> {
    const book = await knex('books')
      .where({ id: bookId })
      .first();

    if (!book) return null;

    const borrows = await knex('borrows').where({ bookId: book.id });

    return { ...book, borrows };
  }

}

export default Book;
