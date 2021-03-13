import express, { Request, Response } from 'express';

import { find } from '../../domain/item_type/queries';

const router = express.Router();

router.get('/type', async (req: Request, res: Response) => {
  const itemTypes = await find();
  res.json(itemTypes);
});

export { router as getItemTypesRouter };
