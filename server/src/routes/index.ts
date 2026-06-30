import { Router } from 'express';
import { fruitRouter } from './fruit.routes.js';

export const apiV1Router = Router();

apiV1Router.use('/fruits', fruitRouter);
