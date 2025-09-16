import dataSource from '../config/data-source';
import { Repository } from 'typeorm';
import { EmployerProfile } from '../models/EmployerProfile';
import { Company } from '../models/Company';
import { singleton } from 'tsyringe';

export interface EmployerCreateDto { companyId: string; phone: string }

export interface IEmployerService {
  getMy(userId: string): Promise<EmployerProfile | null>;
  createForUser(userId: string, dto: EmployerCreateDto): Promise<EmployerProfile>;
}

export const EMPLOYER_SERVICE = Symbol('IEmployerService');

@singleton()
export class EmployerService implements IEmployerService {
  private repo: Repository<EmployerProfile> = dataSource.getRepository(EmployerProfile);
  private companyRepo: Repository<Company> = dataSource.getRepository(Company);

  async getMy(userId: string): Promise<EmployerProfile | null> {
    return this.repo.createQueryBuilder('e')
      .leftJoinAndSelect('e.company', 'c')
      .where('e.userId = :uid', { uid: userId })
      .getOne();
  }

  async createForUser(userId: string, dto: EmployerCreateDto): Promise<EmployerProfile> {
    const company = await this.companyRepo.findOne({ where: { id: dto.companyId } });
    if (!company) { throw new Error('Company not found'); }
    const entity = this.repo.create({ company, phone: dto.phone, userId });
    return this.repo.save(entity);
  }
}
