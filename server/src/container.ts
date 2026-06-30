import { HealthController } from './controllers/health.controller.js';
import { FruitController } from './controllers/fruit.controller.js';
import { FruitService } from './services/fruit.service.js';
import { HealthService } from './services/health.service.js';

const healthService = new HealthService();
const fruitService = new FruitService();

export const healthController = new HealthController(healthService);
export const fruitController = new FruitController(fruitService);
