import { env } from 'process';

class Settings {
  APP_ENVIRONMENT: string = env.NODE_ENV || 'development';
  APP_HOST: string = env.APP_HOST || '0.0.0.0';
  APP_PORT: number = env.APP_PORT ? parseInt(env.APP_PORT) : 8001;
  APP_PROTOCOL: string = env.APP_PROTOCOL || 'http';
  APP_API_PREFIX: string = '/api/auth';

  DB_HOST = env.DB_HOST || 'localhost';
  DB_PORT = env.DB_PORT ? parseInt(env.DB_PORT) : 5432;
  DB_NAME = env.DB_NAME || 'postgres';
  DB_USER = env.DB_USER || 'postgres';
  DB_PASSWORD = env.DB_PASSWORD || 'postgres';
  DB_SCHEMA = env.DB_SCHEMA || 'auth';
  private isProduction = (env.NODE_ENV === 'production');
  DB_ENTITIES = this.isProduction ? 'dist/models/**/*.js' : 'src/models/**/*.ts';
  DB_MIGRATIONS = this.isProduction ? 'dist/migrations/**/*.js' : 'src/migrations/**/*.ts';
  JWT_SECRET_KEY = env.JWT_SECRET_KEY || 'secret';
  MESSAGE_BROKER_URL: string = env.MESSAGE_BROKER_URL || 'amqp://localhost:5672';
}

export default new Settings();

