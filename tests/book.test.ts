import request from 'supertest';
import app from '../src/app';
import {knexInstance as knex} from '../src/database'; // Import Knex instance
import bcrypt from 'bcrypt';

describe('Book API', () => {
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    // Seed an admin and user using Knex
    await knex('users').insert([
      {
        full_name: 'Admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword', 10),
        role: 'admin',
      },
      {
        full_name: 'User',
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
    userToken = userLoginRes.body.token;
  });

  beforeEach(async () => {
    // Clear all books before running tests using Knex
    await knex('books').del();
  });

  it('should create a new book (Admin)', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        availableCopies: 5,
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
        genre: 'Fiction',
        availableCopies: 5,
      });

    expect(res.statusCode).toEqual(403); // Forbidden
  });

  it('should update a book (Admin)', async () => {
    // Insert a book using Knex
    const [bookIdObj] = await knex('books').insert({
      title: 'Old Book',
      author: 'Old Author',
      availableCopies: 3,
    }).returning('id');

    const res = await request(app)
      .put(`/api/books/${bookIdObj.id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .set('Content-Type', 'application/json')
      .send({
        title: 'New Book Title',
        author: 'New Author',
        availableCopies: 10,
      });
    
    console.log(res.body)
    expect(res.statusCode).toEqual(200);
    expect(res.body.book.title).toEqual('New Book Title');
  });

  it('should delete a book (Admin)', async () => {
    // Insert a book using Knex
    const [bookIdObj] = await knex('books').insert({
      title: 'Book to delete',
      author: 'Author of book to delete',
      availableCopies: 1,
    }).returning('id');

    const res = await request(app)
      .delete(`/api/books/${bookIdObj.id}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toEqual(204); // No content on delete
  });

  afterAll(async () => {
    // Cleanup: Destroy all users and books, then close Knex connection
    await knex('users').del();
    await knex('books').del();

    // Ensure Knex closes the connection
    await knex.destroy();
  });
});
