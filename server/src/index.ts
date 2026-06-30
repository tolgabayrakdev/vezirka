import { app } from './app.js';
import { env } from './config/env.js';
import { db } from './db/knex.js';

const server = app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});

let isShuttingDown = false;

async function shutdown(signal: string) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  console.log(`${signal} received, shutting down`);

  server.close(async (error) => {
    if (error) {
      console.error('Failed to close HTTP server', error);
    }

    try {
      await db.destroy();
      process.exit(error ? 1 : 0);
    } catch (dbError) {
      console.error('Failed to close database connection', dbError);
      process.exit(1);
    }
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
