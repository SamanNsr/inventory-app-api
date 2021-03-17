import express, { Request, Response } from 'express';

import { User } from '../../model/user/model';
import { NotFoundError } from '../../errors/not-found-error';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await User.query()
    .select('id', 'email', 'name', 'created_at', 'updated_at')
    .where('deleted_at', null);
  res.json(users);
});

// router.get('/:id', async (req: Request, res: Response) => {
//   const state = await findById(req.params.id);
//   if (!state) {
//     throw new NotFoundError();
//   }

//   res.json(state);
// });

export { router as getUsersRouter };
