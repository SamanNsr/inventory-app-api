import express, { Request, Response } from 'express';

import { Item } from '../../model/item/model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const items = await Item.query().select().where('deleted_at', null);
  res.json(items);
});

router.get('/:id', async (req: Request, res: Response) => {
  const item = await Item.query()
    .where('deleted_at', null)
    .andWhere('id', req.params.id)
    .withGraphFetched('item_infos')
    .first();

  res.json(item);
});

export { router as getItemsRouter };
