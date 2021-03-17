import express, { Request, Response } from 'express';

import { find } from '../../model/inventory_location/queries';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const inventoryLocations = await find();
  res.json(inventoryLocations);
});

export { router as getInventoryLocationsRouter };
