import request from 'supertest';
import { app } from '../../../app';

describe('GET /api/v1/cities', () => {
  it('Should response with an array of cities', async () => {
    const response = await request(app)
      .get('/api/v1/cities')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual([]);
  });
});
