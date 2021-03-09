import express, { json } from 'express';
import 'express-async-errors';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { apiV1Router } from './routes/index';

const app = express();

app.use(json());

app.use('/api/v1', apiV1Router);

app.all('*', () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
