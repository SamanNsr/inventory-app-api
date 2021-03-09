import request from 'supertest';
import { app } from '../app';
import { db } from '../db/db';

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

beforeEach(async () => {});

afterAll(async () => {
  await db.destroy();
});
