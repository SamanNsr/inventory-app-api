import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Item } from '../../model/item/model';
import { validateRequest } from '../../middlewares/validate-request';
const router = express.Router();

router.patch(
  '/:id',
  [
    body('quantity').isNumeric().withMessage('quantity must be valid'),
    body('purchase_date').isDate().withMessage('purchase date must be valid date'),
    body('expiration_date').isDate().withMessage('expiration date must be valid date'),
    body('last_used').isDate().withMessage('last used must be valid date'),
    body('supplier_id').isNumeric().withMessage('supplier_id must be valid number'),
    body('purchase_price')
      .isFloat({ min: 0 })
      .withMessage('purchase price must be valid number'),
    body('msr_price')
      .isFloat({ min: 0 })
      .withMessage('manufacture suggest price must be valid number'),
    body('inventory_location')
      .isNumeric()
      .withMessage('inventory_location_id must be valid number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const item = await Item.query().patchAndFetchById(req.params.id, req.body);

    res.json(item);
  }
);

export { router as patchItemInfosRouter };
