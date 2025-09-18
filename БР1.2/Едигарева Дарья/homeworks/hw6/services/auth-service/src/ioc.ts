import 'reflect-metadata';
import { container } from 'tsyringe';
import type { IocContainer, ServiceIdentifier } from '@tsoa/runtime';
import { AuthService } from './services/auth';
import { AUTH_SERVICE } from './services/auth.types';

export const iocContainer: IocContainer = {
  get<T>(controller: ServiceIdentifier<T>): T | Promise<T> {
    return container.resolve(controller as any);
  },
};

// Register interface-based bindings
container.register(AUTH_SERVICE, { useClass: AuthService });
