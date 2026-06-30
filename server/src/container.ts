import { HealthController } from './controllers/health.controller.js';
import { HealthService } from './services/health.service.js';

const healthService = new HealthService();

export const healthController = new HealthController(healthService);
