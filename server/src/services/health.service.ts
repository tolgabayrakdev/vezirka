import { db } from '../db/knex.js';

export type HealthStatus = {
  status: 'ok';
  database: 'ok';
  uptime: number;
};

export class HealthService {
  async getHealthStatus(): Promise<HealthStatus> {
    await db.raw('select 1');

    return {
      status: 'ok',
      database: 'ok',
      uptime: process.uptime()
    };
  }
}
