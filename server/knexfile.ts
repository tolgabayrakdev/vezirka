import 'dotenv/config';
import type { Knex } from 'knex';

const connection = process.env.DATABASE_URL;

if (!connection) {
  throw new Error('DATABASE_URL is required');
}

const config: Record<string, Knex.Config> = {
  development: {
    client: 'pg',
    connection,
    migrations: {
      directory: './database/migrations',
      extension: 'ts'
    },
    seeds: {
      directory: './database/seeds',
      extension: 'ts'
    }
  },
  production: {
    client: 'pg',
    connection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './dist/database/migrations',
      extension: 'js'
    },
    seeds: {
      directory: './dist/database/seeds',
      extension: 'js'
    }
  }
};

export default config[process.env.NODE_ENV ?? 'development'];
