import request from 'supertest';
import { app } from '../../../app';

describe('GET /api/v1/addresses', () => {
  it('Should response with an array of addresses', async () => {
    const response = await request(app)
      .get('/api/v1/addresses')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });
});
