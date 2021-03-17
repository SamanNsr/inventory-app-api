import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { insert } from '../../model/item_type/queries';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().isLength({ min: 3 }).withMessage('name must be valid'),
    body('description').isLength({ min: 3 }).withMessage('description must be valid'),
    body('image_url').isURL().withMessage('image_url must be valid url'),
    body('lat').isNumeric().withMessage('lat must be valid'),
    body('lng').isNumeric().withMessage('lng must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const inventoryLocation = await insert(req.body);
    res.json(inventoryLocation);
  }
);

export { router as createInventoryLocationsRouter };
