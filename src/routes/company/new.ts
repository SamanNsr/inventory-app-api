import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Company } from '../../model/company/model';
import { validateRequest } from '../../middlewares/validate-request';
const router = express.Router();

router.post(
  '/',
  [
    body('name').notEmpty().isLength({ min: 3 }).withMessage('name must be valid'),
    body('address_id')
      .notEmpty()
      .isNumeric()
      .withMessage('address_id must be valid number'),
    body('thumbnail_url').isURL().withMessage('thumbnail_url must be valid'),
    body('description').isLength({ min: 3 }).withMessage('description must be valid'),
    body('website_url').isURL().withMessage('website_url must be valid'),
    body('email').isEmail().withMessage('email must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const company = await Company.query().insert(req.body);

    res.json(company);
  }
);

export { router as createCompanyRouter };
