import express, { Request, Response } from 'express';

import { Address } from '../../domain/address/model';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const addresses = await Address.query().select().where('deleted_at', null);
  res.json(addresses);
});

export { router as getAddressesRouter };
