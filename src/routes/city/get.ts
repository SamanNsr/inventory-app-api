import express, { Request, Response } from 'express';

import { find, findById } from '../../domain/city/queries';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const cities = await find();
  res.json(cities);
});

router.get('/:id', async (req: Request, res: Response) => {
  const city = await findById(req.params.id);
  if (!city) {
    throw new NotFoundError();
  }

  res.json(city);
});

export { router as getCitiesRouter };
