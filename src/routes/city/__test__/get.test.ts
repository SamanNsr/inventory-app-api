import request from 'supertest';
import { app } from '../../../app';

describe('GET /api/v1/cities', () => {
  it('Should response with an array of cities', async () => {
    const response = await request(app)
      .get('/api/v1/cities')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.length).toBeGreaterThan(0);
  });

  it('Should response with an individual city', async () => {
    const response = await request(app)
      .get('/api/v1/cities/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.id).toBe(1);
  });

  it('Should response with a 4040 for a not found city', async () => {
    const response = await request(app)
      .get('/api/v1/cities/10000000')
      .expect('Content-Type', /json/)
      .expect(404);
  });
});
