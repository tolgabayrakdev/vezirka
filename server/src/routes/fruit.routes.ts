import { Router } from 'express';
import { fruitController } from '../container.js';
import {
  createFruitSchema,
  fruitParamsSchema,
  updateFruitSchema,
} from '../schemas/fruit.schemas.js';
import { validateRequest } from '../middlewares/validate-request.middleware.js';

export const fruitRouter = Router();

fruitRouter.get('/', fruitController.listFruits);
fruitRouter.get('/:id', validateRequest({ params: fruitParamsSchema }), fruitController.getFruit);
fruitRouter.post('/', validateRequest({ body: createFruitSchema }), fruitController.createFruit);
fruitRouter.patch(
  '/:id',
  validateRequest({ params: fruitParamsSchema, body: updateFruitSchema }),
  fruitController.updateFruit,
);
fruitRouter.delete(
  '/:id',
  validateRequest({ params: fruitParamsSchema }),
  fruitController.deleteFruit,
);
