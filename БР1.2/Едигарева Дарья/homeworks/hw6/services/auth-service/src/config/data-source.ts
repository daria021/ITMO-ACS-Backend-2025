import 'reflect-metadata';
import { DataSource } from 'typeorm';
import SETTINGS from './settings';

const dataSource = new DataSource({
  type: 'postgres',
  host: SETTINGS.DB_HOST,
  port: SETTINGS.DB_PORT,
  username: SETTINGS.DB_USER,
  password: SETTINGS.DB_PASSWORD,
  database: SETTINGS.DB_NAME,
  logging: true,
  synchronize: false,
  schema: SETTINGS.DB_SCHEMA,
  entities: [SETTINGS.DB_ENTITIES],
  migrations: [SETTINGS.DB_MIGRATIONS],
});

export default dataSource;


