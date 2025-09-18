"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
class Settings {
    constructor() {
        this.APP_ENVIRONMENT = process_1.env.NODE_ENV || 'development';
        this.APP_HOST = process_1.env.APP_HOST || '0.0.0.0';
        this.APP_PORT = process_1.env.APP_PORT ? parseInt(process_1.env.APP_PORT) : 8003;
        this.APP_PROTOCOL = process_1.env.APP_PROTOCOL || 'http';
        this.DB_HOST = process_1.env.DB_HOST || 'localhost';
        this.DB_PORT = process_1.env.DB_PORT ? parseInt(process_1.env.DB_PORT) : 5432;
        this.DB_NAME = process_1.env.DB_NAME || 'postgres';
        this.DB_USER = process_1.env.DB_USER || 'postgres';
        this.DB_PASSWORD = process_1.env.DB_PASSWORD || 'postgres';
        this.DB_SCHEMA = process_1.env.DB_SCHEMA || 'profiles';
        this.isProduction = (process_1.env.NODE_ENV === 'production');
        this.DB_ENTITIES = this.isProduction ? 'dist/models/**/*.js' : 'src/models/**/*.ts';
        this.DB_MIGRATIONS = this.isProduction ? 'dist/migrations/**/*.js' : 'src/migrations/**/*.ts';
        this.JWT_SECRET_KEY = process_1.env.JWT_SECRET_KEY || 'secret';
        this.MESSAGE_BROKER_URL = process_1.env.MESSAGE_BROKER_URL || 'amqp://localhost:5672';
    }
}
exports.default = new Settings();
