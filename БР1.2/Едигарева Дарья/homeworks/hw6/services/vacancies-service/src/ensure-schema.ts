import { Client } from 'pg';

async function main() {
  const {
    DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SCHEMA,
  } = process.env;

  if (!DB_SCHEMA) {
    // специально валимся, чтобы сразу видно было где забыли схему
    throw new Error('DB_SCHEMA is not set');
  }

  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT ?? 5432),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  await client.connect();
  await client.query(`CREATE SCHEMA IF NOT EXISTS "${DB_SCHEMA}";`);
  await client.end();

  console.log(`Schema "${DB_SCHEMA}" is ensured.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
