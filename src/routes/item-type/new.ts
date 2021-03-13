import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { insert } from '../../domain/item_type/queries';
import { validateRequest } from '../../middlewares/validate-request';

const router = express.Router();

router.post(
  '/type',
  [
    body('name')
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage('name must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const itemTypes = await insert({ name });
    res.json(itemTypes);
  }
);

export { router as createItemTypesRouter };
