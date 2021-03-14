import express, { Request, Response } from 'express';

import { ItemInfo } from '../../domain/item-info/model';

const router = express.Router();

router.get('/item/:item_id', async (req: Request, res: Response) => {
  const itemInfos = await ItemInfo.query()
    .select()
    .where('item_id', req.params.item_id)
    .andWhere('deleted_at', null);
  res.json(itemInfos);
});

router.get('/:id', async (req: Request, res: Response) => {
  const itemInfo = await ItemInfo.query()
    .select()
    .findById(req.params.id)
    .first();

  res.json(itemInfo);
});

export { router as getItemInfosRouter };
