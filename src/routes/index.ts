import express, { Request, Response } from 'express';

import { signinRouter, signupRouter } from './auth';
import { getUsersRouter } from './user';
import { getStatesRouter } from './state';

const router = express.Router();

router.use('/auth', signinRouter);
router.use('/auth', signupRouter);

router.use('/users', getUsersRouter);

router.use('/states', getStatesRouter);

export { router as apiV1Router };
