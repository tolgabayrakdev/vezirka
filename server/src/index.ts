import { app } from './app.js';
import { env } from './config/env.js';
import { db } from './db/knex.js';

const server = app.listen(env.port, () => {
  console.log(`API listening on http://localhost:${env.port}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received, shutting down`);

  server.close(async () => {
    await db.destroy();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
