import request from 'supertest';
import { app } from '../../../app';

describe('GET /api/v1/items', () => {
  it('Should response with an array of items', async () => {
    const response = await request(app)
      .get('/api/v1/items')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });
});
