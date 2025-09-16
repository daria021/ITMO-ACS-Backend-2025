import 'reflect-metadata';
import express, { Application, ErrorRequestHandler } from 'express';
import cors from 'cors';
import dataSource from './config/data-source';
import SETTINGS from './config/settings';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import swaggerDocument from '../swagger.json';

export class App {
  public readonly app: Application;
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    // Ensure correct base URL in Swagger.
    // В проде (через gateway) делаем /api/auth первым, локально — '/'.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    swaggerDocument.servers = (process.env.NODE_ENV === 'production')
      ? [{ url: '/api/auth' }, { url: '/' }]
      : [{ url: '/' }, { url: '/api/auth' }];
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.app.get('/swagger.json', (_req, res) => res.json(swaggerDocument));
    RegisterRoutes(this.app);

    const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
      const anyErr = err as any;
      if (anyErr && anyErr.status) {
        res.status(anyErr.status).json({ message: anyErr.message, details: anyErr.fields });
        return;
      }
      if (err instanceof Error) {
        console.error(err);
        res.status(500).json({ message: err.message });
        return;
      }
      next();
    };
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    await dataSource.initialize();
    this.app.listen(SETTINGS.APP_PORT, SETTINGS.APP_HOST, () => {
      console.log(`Auth service at http://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}`);
    });
  }
}

new App().start().catch(err => { console.error(err); process.exit(1); });
