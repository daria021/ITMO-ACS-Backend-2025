import { Client } from 'pg';
import SETTINGS from './config/settings';

async function main() {
  if (!SETTINGS.DB_SCHEMA) {
    throw new Error('DB_SCHEMA is not set');
  }

  const client = new Client({
    host: SETTINGS.DB_HOST,
    port: Number(SETTINGS.DB_PORT ?? 5432),
    user: SETTINGS.DB_USER,
    password: SETTINGS.DB_PASSWORD,
    database: SETTINGS.DB_NAME,
  });

  await client.connect();
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${SETTINGS.DB_SCHEMA}";`);
  await client.end();

  console.log(`Schema "${SETTINGS.DB_SCHEMA}" is ensured.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
