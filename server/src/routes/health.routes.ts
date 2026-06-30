import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';
import { HealthService } from '../services/health.service.js';

export const healthRouter = Router();

const healthService = new HealthService();
const healthController = new HealthController(healthService);

healthRouter.get('/', healthController.getHealth);
