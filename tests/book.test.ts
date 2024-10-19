import request from 'supertest';
import app from '../src/app';
import Book  from '../src/models/Book'; // Assuming this is your Book model

describe('Book API', () => {
  let token: string;

  beforeAll(async () => {
    // Login as admin to get the JWT token for authorization
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword',
      });
    token = loginRes.body.token;
  });

  it('should create a new book', async () => {
    const res = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        publishedDate: '1925-04-10',
        copies: 5,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('The Great Gatsby');
  });

  it('should update a book', async () => {
    const book = await Book.create({
      title: 'Old Book',
      author: 'Old Author',
      availableCopies: 3,
    });

    const res = await request(app)
      .put(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Book Title',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('New Book Title');
  });

  it('should delete a book', async () => {
    const book = await Book.create({
      title: 'Book to delete',
      author: 'Author',
      availableCopies: 1,
    });

    const res = await request(app)
      .delete(`/api/books/${book.id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(204); // No content on delete
  });
});
