import { HealthController } from './controllers/health.controller.js';
import { FruitController } from './controllers/fruit.controller.js';
import { FruitRepository } from './repositories/fruit.repository.js';
import { FruitService } from './services/fruit.service.js';
import { HealthService } from './services/health.service.js';

const healthService = new HealthService();
const fruitRepository = new FruitRepository();
const fruitService = new FruitService(fruitRepository);

export const healthController = new HealthController(healthService);
export const fruitController = new FruitController(fruitService);
