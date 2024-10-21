import request from 'supertest';
import app from '../src/app';
import User, { UserAttributes } from '../src/models/User';
import Book from '../src/models/Book';
import Borrow from '../src/models/Borrow';
import { knexInstance as knex } from '../src/database';
import bcrypt from 'bcrypt';

describe('Report API', () => {
  let userToken: string;
  let adminToken: string;
  let user: UserAttributes;
  let admin: UserAttributes;
  let book1: Book;
  let book2: Book;

  beforeAll(async () => {
    // Create an admin user
    admin = await User.create({
        full_name: 'Admin User',
        email: 'admin@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'admin',
    });

    user = await User.create({
      full_name: 'Test User',
      email: 'test.user@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
    });

    // Get user token
    const userLoginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test.user@example.com',
        password: 'password123',
      });
    userToken = userLoginRes.body.token;

    // Get user token
    const adminLoginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        password: 'password123',
      });
    adminToken = adminLoginRes.body.token;

    // Create test books
    book1 = await Book.create({
      title: 'Book 1',
      author: 'Author 1',
      availableCopies: 3,
    });
    book2 = await Book.create({
      title: 'Book 2',
      author: 'Author 2',
      availableCopies: 2,
    });

    // Create borrow records for the books
    await Borrow.create({
      userId: user.id,
      bookId: book1.id as number,
      borrowDate: new Date(),
    });
    await Borrow.create({
      userId: user.id,
      bookId: book2.id as number,
      borrowDate: new Date(),
    });
  });

  it('should return a report of currently borrowed books', async () => {
    const res = await request(app)
      .get('/api/reports/borrowed')
      .set('Authorization', `Bearer ${adminToken}`);

    console.log(res.body)
    expect(res.statusCode).toEqual(200);
    expect(res.body.borrowedBooks).toBeInstanceOf(Array);
    expect(res.body.borrowedBooks.length).toBeGreaterThan(0); // Check that there are borrowed books
  });

  it('should return a report of the most popular books', async () => {
    const res = await request(app)
      .get('/api/reports/popular')
      .set('Authorization', `Bearer ${adminToken}`);

    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.popularBooks).toBeInstanceOf(Array);
    expect(res.body.popularBooks.length).toBeGreaterThan(0); // Check that there are popular books
    expect(res.body.popularBooks[0]).toHaveProperty('bookId'); // Check that it includes bookId
    expect(res.body.popularBooks[0]).toHaveProperty('borrowCount'); // Check that it includes borrowCount
    expect(res.body.popularBooks[0]).toHaveProperty('title'); // Check that it includes title
  });

  afterAll(async () => {
    // Clean up test data
    await Borrow.destroy();
    await Book.destroy();
    await User.destroy();

    // Close database connection
    await knex.destroy();

  });
});
