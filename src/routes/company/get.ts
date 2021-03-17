import express, { Request, Response } from 'express';

import { Company } from '../../model/company/model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const companies = await Company.query().select().where('deleted_at', null);
  res.json(companies);
});

export { router as getCompaniesRouter };
