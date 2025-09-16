import dataSource from '../config/data-source';
import { Repository } from 'typeorm';
import { Company } from '../models/Company';
import { Industry } from '../common/enums';
import { singleton } from 'tsyringe';

export interface CompanyCreateDto {
  name: string;
  description?: string;
  industry: Industry;
  website?: string;
  address?: string;
  phone?: string;
  email?: string;
  foundedDate?: string;
  employeesCount?: number;
}

export type CompanyUpdateDto = Partial<CompanyCreateDto>;

export interface ICompanyService {
  list(): Promise<Company[]>;
  getById(id: string): Promise<Company>;
  create(dto: CompanyCreateDto): Promise<Company>;
  update(id: string, dto: CompanyUpdateDto): Promise<Company>;
  remove(id: string): Promise<void>;
}

export const COMPANY_SERVICE = Symbol('ICompanyService');

@singleton()
export class CompanyService implements ICompanyService {
  private repo: Repository<Company> = dataSource.getRepository(Company);

  async list(): Promise<Company[]> { return this.repo.find(); }
  async getById(id: string): Promise<Company> {
    const c = await this.repo.findOne({ where: { id } });
    if (!c) throw new Error('Company not found');
    return c;
  }
  async create(dto: CompanyCreateDto): Promise<Company> {
    const entity: Company = this.repo.create(dto as Company);
return this.repo.save(entity);
  }
  async update(id: string, dto: CompanyUpdateDto): Promise<Company> {
    const c = await this.getById(id);
    Object.assign(c, dto);
    return this.repo.save(c);
  }
  async remove(id: string): Promise<void> { await this.repo.delete(id); }
}
