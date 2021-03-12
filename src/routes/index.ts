import express, { Request, Response } from 'express';

import { signinRouter, signupRouter } from './auth';
import { getUsersRouter } from './user';
import { getStatesRouter } from './state';
import { getAddressesRouter, createAddressRouter } from './address';

const router = express.Router();

router.use('/auth', signinRouter, signupRouter);

router.use('/users', getUsersRouter);

router.use('/states', getStatesRouter);

router.use('/addresses', getAddressesRouter, createAddressRouter);

export { router as apiV1Router };
