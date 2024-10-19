import request from 'supertest';
import app from '../src/app';
import Book from '../src/models/Book'
import User from '../src/models/User'

describe('Borrow API', () => {
  let token: string;

  beforeAll(async () => {
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'user@example.com',
        password: 'userpassword',
      });
    token = loginRes.body.token;
  });

  it('should borrow a book', async () => {
    const book = await Book.create({
      title: 'Borrow Book',
      author: 'Some Author',
      availableCopies: 3,
    });

    const res = await request(app)
      .post('/api/borrow')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId: book.id });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('borrowId');
  });

  it('should return a borrowed book', async () => {
    const res = await request(app)
      .post('/api/return')
      .set('Authorization', `Bearer ${token}`)
      .send({ bookId: 1 }); // assuming bookId 1 exists

    expect(res.statusCode).toEqual(200);
  });
});
