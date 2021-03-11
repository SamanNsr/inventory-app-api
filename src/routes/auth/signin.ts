import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../../domain/user/model';
import { BadRequestError } from '../../errors/bad-request-error';
import { NotFoundError } from '../../errors/not-found-error';
import { validateRequest } from '../../middlewares/validate-request';
import { PasswordManager } from '../../services/password-manger';

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').notEmpty().isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 100 })
      .matches(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/)
      .withMessage('Password must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.query().where({ email }).first();
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password!,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.json({ user: existingUser, token: userJwt });
  }
);

export { router as signinRouter };
