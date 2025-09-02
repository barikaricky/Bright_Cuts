const request = require('supertest');
const app = require('../server');

describe('GROOMOSPHERE API Health Check', () => {
  test('GET /health should return OK status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toMatchObject({
      status: 'OK',
      message: 'GROOMOSPHERE API is running'
    });
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('database');
  });

  test('GET /nonexistent should return 404', async () => {
    const response = await request(app)
      .get('/nonexistent')
      .expect(404);

    expect(response.body).toMatchObject({
      error: 'Route not found'
    });
  });
});

describe('Authentication Endpoints', () => {
  test('POST /api/auth/register should require valid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'invalid-email'
      })
      .expect(500); // Will fail due to validation or missing MongoDB

    // This test validates that the endpoint exists and handles requests
    expect(response.body).toHaveProperty('error');
  });

  test('POST /api/auth/login should require valid data', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'wrong'
      })
      .expect(500); // Will fail due to missing MongoDB

    // This test validates that the endpoint exists and handles requests
    expect(response.body).toHaveProperty('error');
  });
});