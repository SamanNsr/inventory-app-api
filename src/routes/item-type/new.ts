import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { insert } from '../../model/item_type/queries';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

router.post(
  '/',
  [body('name').notEmpty().isLength({ min: 3 }).withMessage('name must be valid')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const itemType = await insert({ name });
    res.json(itemType);
  }
);

export { router as createItemTypesRouter };
