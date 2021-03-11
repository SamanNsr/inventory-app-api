import express, { Request, Response } from 'express';

import { find, findById } from '../../domain/state/queries';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const states = await find();
  res.json(states);
});

router.get('/:id', async (req: Request, res: Response) => {
  const state = await findById(req.params.id);
  if (!state) {
    throw new NotFoundError();
  }

  res.json(state);
});

export { router as getStatesRouter };
