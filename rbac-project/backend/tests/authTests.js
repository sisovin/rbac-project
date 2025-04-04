const request = require('supertest');
const app = require('../server');
const { User } = require('../config/database');
const jwtUtils = require('../utils/jwtUtils');

describe('Authentication Tests', () => {
  let token;

  beforeAll(async () => {
    // Create a test user
    await User.create({
      username: 'testuser',
      password: 'password123',
      roles: ['user'],
    });

    // Generate a token for the test user
    token = jwtUtils.createToken({ id: 'testuser', roles: ['user'] });
  });

  afterAll(async () => {
    // Clean up the test user
    await User.deleteOne({ username: 'testuser' });
  });

  test('should login and return a token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('should validate the token', async () => {
    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', token);

    expect(response.status).toBe(200);
  });

  test('should return 401 for invalid token', async () => {
    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', 'invalidtoken');

    expect(response.status).toBe(401);
  });

  test('should return 401 for expired token', async () => {
    const expiredToken = jwtUtils.createToken({ id: 'testuser', roles: ['user'] }, { expiresIn: '1ms' });

    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', expiredToken);

    expect(response.status).toBe(401);
  });
});
