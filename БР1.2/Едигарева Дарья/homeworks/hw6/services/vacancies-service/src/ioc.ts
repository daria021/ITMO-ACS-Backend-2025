import 'reflect-metadata';
import { container } from 'tsyringe';
import type { IocContainer, ServiceIdentifier } from '@tsoa/runtime';
import { COMPANY_SERVICE, CompanyService } from './services/company';
import { EMPLOYER_SERVICE, EmployerService } from './services/employer';
import { VACANCY_SERVICE, VacancyService } from './services/vacancy';

export const iocContainer: IocContainer = {
  get<T>(controller: ServiceIdentifier<T>): T | Promise<T> {
    return container.resolve(controller as any);
  },
};

// Interface-token bindings
container.register(COMPANY_SERVICE, { useClass: CompanyService });
container.register(EMPLOYER_SERVICE, { useClass: EmployerService });
container.register(VACANCY_SERVICE, { useClass: VacancyService });
