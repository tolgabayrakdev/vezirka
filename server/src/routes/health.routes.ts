import { Router } from 'express';
import { healthController } from '../container.js';

export const healthRouter = Router();

healthRouter.get('/', healthController.getHealth);
