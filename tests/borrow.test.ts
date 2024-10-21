import request from 'supertest';
import app from '../src/app';
import Book from '../src/models/Book';
import User, { UserAttributes } from '../src/models/User';
import Borrow, { BorrowAttributes } from '../src/models/Borrow';
import bcrypt from 'bcrypt';
import { knexInstance as knex } from '../src/database';

describe('Borrow API', () => {
  let adminToken: string;
  let userToken: string;
  let user: UserAttributes;
  let admin: UserAttributes;
  let book1: Book;
  let book2: Book;

  beforeAll(async () => {
    // Seed an admin and user
    admin = await User.create({
      full_name: 'Admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('adminpassword', 10),
      role: 'admin',
    });
    user = await User.create({
      full_name: 'User',
      email: 'user@example.com',
      password: await bcrypt.hash('userpassword', 10),
      role: 'user',
    });

    // Get their tokens
    const adminLoginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword',
      });
    adminToken = adminLoginRes.body.token;

    const userLoginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'user@example.com',
        password: 'userpassword',
      });
    userToken = userLoginRes.body.token;

    // Create two books
    book1 = await Book.create({
      title: 'Book 1',
      author: 'Author 1',
      availableCopies: 3,
    });
    book2 = await Book.create({
      title: 'Book 2',
      author: 'Author 2',
      availableCopies: 0,
    });
  });

  it('should borrow a book', async () => {
    const res = await request(app)
      .post('/api/borrow')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ bookId: book1.id });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('borrowId');
  });

  it('should return a borrowed book', async () => {
    // Setup a borrow record
    const borrowRecord = await Borrow.create({
      userId: user.id,
      bookId: book1.id as number,
      borrowDate: new Date(),
    });

    const res = await request(app)
      .post('/api/return')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ bookId: book1.id });

    // Fetch the updated borrow record from the database
    const updatedBorrowRecord = await Borrow.findById(borrowRecord.id) as BorrowAttributes;

    expect(res.statusCode).toEqual(200);
    expect(updatedBorrowRecord.returnDate).not.toBeUndefined;
  });

  afterAll(async () => {
    await Book.destroy();
    await User.destroy();
    await Borrow.destroy();

    // Close database connection
    await knex.destroy();
  });
});
