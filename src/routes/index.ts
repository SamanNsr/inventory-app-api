import express, { Request, Response } from 'express';

import { getCitiesRouter } from './city/get';

const router = express.Router();

router.use('/cities', getCitiesRouter);

export { router as apiV1Router };
