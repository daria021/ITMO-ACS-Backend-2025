import 'reflect-metadata';
import { container } from 'tsyringe';
import type { IocContainer, ServiceIdentifier } from '@tsoa/runtime';
import { PROFILE_SERVICE, ProfileService } from './services/profile';

export const iocContainer: IocContainer = {
  get<T>(controller: ServiceIdentifier<T>): T | Promise<T> {
    return container.resolve(controller as any);
  },
};

// Bind interface token to implementation
container.register(PROFILE_SERVICE, { useClass: ProfileService });
