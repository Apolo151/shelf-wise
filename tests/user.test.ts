import request from 'supertest';
import app from '../src/app'; // Assuming this is where your express app is
import User from '../src/models/User';
import { knexInstance as knex } from '../src/database'; // Import Knex instance

describe('User API', () => {
  beforeEach(async () => {
    // Drop all users before running tests
    await User.destroy();
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.email).toEqual('john.doe@example.com');
  });

  it('should login a user', async () => {
    // First, register the user
    await request(app)
      .post('/api/register')
      .send({
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      });
    
    // Now, log in with the same user credentials
    const res = await request(app)
      .post('/api/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123',
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token'); // Assuming JWT token is returned
  });

  afterAll(async () => {
    // Cleanup: Drop all users and close database connection
    await User.destroy();
    // Ensure Knex closes the connection
    await knex.destroy();
  });
});
