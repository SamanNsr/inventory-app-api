import express, { Request, Response } from 'express';

import { Item } from '../../domain/item/model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const companies = await Item.query().select().where('deleted_at', null);
  res.json(companies);
});

export { router as getItemsRouter };
