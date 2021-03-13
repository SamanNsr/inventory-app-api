import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Item } from '../../domain/item/model';
import { validateRequest } from '../../middlewares/validate-request';
const router = express.Router();

router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('name must be valid'),
    body('item_type_id')
      .notEmpty()
      .isNumeric()
      .withMessage('item_type_id must be valid number'),
    body('description')
      .isLength({ min: 3 })
      .withMessage('description must be valid'),
    body('manufacturer_id')
      .notEmpty()
      .isNumeric()
      .withMessage('manufacturer_id must be valid number'),
    body('size_id').isNumeric().withMessage('size_id must be valid number'),
    body('sku').isString().withMessage('sku must be valid'),
    body('sparks_joy').isBoolean().withMessage('sparks_joy must be boolean'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    let data = { ...req.body, user_id: null };

    const item = await Item.query().insert(data);

    res.json(item);
  }
);

export { router as createCompanyRouter };
