import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Address } from '../../model/address/model';
import { validateRequest } from '../../middlewares/validate-request';
const router = express.Router();

router.post(
  '/',
  [
    body('address').notEmpty().isLength({ min: 3 }).withMessage('address must be valid'),
    body('city').notEmpty().isLength({ min: 2 }).withMessage('City must be valid'),
    body('state_id').notEmpty().isNumeric().withMessage('state_id must be valid number'),
    body('country_id')
      .notEmpty()
      .isNumeric()
      .withMessage('country_id must be valid number'),
    body('lat').isNumeric().withMessage('latitude must be valid number'),
    body('lng').isNumeric().withMessage('longitude must be valid number'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const address = await Address.query().insert(req.body);

    res.json(address);
  }
);

export { router as createAddressRouter };
