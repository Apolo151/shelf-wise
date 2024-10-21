import request from 'supertest';
import app from '../src/app';
import Book from '../src/models/Book'; // Assuming this is your Book model
import User from '../src/models/User';
import { closeDatabaseConnection } from '../src/models/index'; // Make sure sequelize is imported
import bcrypt from 'bcrypt';

describe('Book API', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    // Seed an admin and user
    await User.bulkCreate([
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', 10),
        role: 'admin',
      },
      {
        name: 'User',
        email: 'user@example.com',
        password: await bcrypt.hash('userpassword', 10),
        role: 'user',
      },
    ]);

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
    userToken = userLoginRes.body.token; // Use the correct property
  });

  beforeEach(async () => {
    // Drop all books before running tests
    await Book.destroy({ where: {} });
  });

  it('should create a new book (Admin)', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishedDate: '1925-04-10',
        copies: 5,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.book).toHaveProperty('id');
    expect(res.body.book.title).toEqual('The Great Gatsby');
  });

  it('should not create a new book (User)', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishedDate: '1925-04-10',
        copies: 5,
      });

    expect(res.statusCode).toEqual(403); // Forbidden
  });

  it('should update a book (Admin)', async () => {
    const book = await Book.create({
      title: 'Old Book',
      author: 'Old Author',
      availableCopies: 3,
    });

    const res = await request(app)
      .put(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'New Book Title',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.book.title).toEqual('New Book Title');
  });

  it('should delete a book', async () => {
    const book = await Book.create({
      title: 'Book to delete',
      author: 'Author',
      availableCopies: 1,
    });

    const res = await request(app)
      .delete(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(204); // No content on delete
  });

  afterAll(async () => {
    // Cleanup: Destroy all users and close DB connection
    await User.destroy({ where: {} });
    await Book.destroy({ where: {} });

    // Ensure the database connection is properly closed
    await closeDatabaseConnection();
  });
});
