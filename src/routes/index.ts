import express, { Request, Response } from 'express';

import { signinRouter, signupRouter } from './auth';
import { getUsersRouter } from './user';
import { getStatesRouter } from './state';
import { getAddressesRouter, createAddressRouter } from './address';
import { getCompaniesRouter, createCompanyRouter } from './company';
import { getItemTypesRouter, createItemTypesRouter } from './item-type';
import { getItemsRouter } from './item';
import {
  createItemInfosRouter,
  getItemInfosRouter,
  patchItemInfosRouter,
} from './item-info';

const router = express.Router();

router.use('/auth', signinRouter, signupRouter);

router.use('/users', getUsersRouter);

router.use('/states', getStatesRouter);

router.use('/addresses', getAddressesRouter, createAddressRouter);

router.use('/companies', getCompaniesRouter, createCompanyRouter);

router.use('/companies', getItemTypesRouter, createItemTypesRouter);

router.use('/items', getItemsRouter);

router.use(
  '/iteminfos',
  getItemInfosRouter,
  createItemInfosRouter,
  patchItemInfosRouter
);

export { router as apiV1Router };
