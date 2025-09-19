import 'reflect-metadata';
import express, { Application, ErrorRequestHandler } from 'express';
import cors from 'cors';
import dataSource from './config/data-source';
import SETTINGS from './config/settings';
import { RegisterRoutes } from './routes';
import swaggerUi from 'swagger-ui-express';
// @ts-ignore
const swaggerDocument = require('../swagger.json');

export class App {
  public readonly app: Application;

  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());

    // Swagger
    const swaggerDoc = { ...swaggerDocument, servers: [{ url: SETTINGS.APP_API_PREFIX }] };
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    this.app.get('/swagger.json', (_req, res) => res.json(swaggerDoc));

    // routes
    RegisterRoutes(this.app);
    this.configureErrorHandling();
  }

  private configureErrorHandling(): void {
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
      console.log(`Server running at http://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}`);
      console.log(`Swagger docs at http://${SETTINGS.APP_HOST}:${SETTINGS.APP_PORT}/docs`);
    });
  }
}

new App()
  .start()
  .catch(err => {
    console.error('Failed to start server', err);
    process.exit(1);
  });
