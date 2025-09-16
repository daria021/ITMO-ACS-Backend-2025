import { Repository } from 'typeorm';
import dataSource from '../config/data-source';
import { Vacancy } from '../models/Vacancy';
import { Industry } from '../common/enums';
import { EmployerProfile } from '../models/EmployerProfile';
import { singleton } from 'tsyringe';

export interface VacancySearchParams { industry?: Industry; salaryMin?: number; salaryMax?: number; experienceMin?: number; experienceMax?: number; }
export interface VacancyCreateDto { title: string; description: string; requirements?: string; salaryMin?: number; salaryMax?: number; industry: Industry; experienceRequired?: number; expireDate?: Date; }
export interface VacancyUpdateDto extends Partial<VacancyCreateDto> {}

export interface IVacancyService {
  search(params: VacancySearchParams): Promise<Vacancy[]>;
  getById(id: string): Promise<Vacancy>;
  createForEmployer(userId: string, dto: VacancyCreateDto): Promise<Vacancy>;
  updateForEmployer(userId: string, id: string, dto: VacancyUpdateDto): Promise<Vacancy>;
  deleteForEmployer(userId: string, id: string): Promise<void>;
}

export const VACANCY_SERVICE = Symbol('IVacancyService');

@singleton()
export class VacancyService implements IVacancyService {
  private readonly repo: Repository<Vacancy> = dataSource.getRepository(Vacancy);
  private readonly employerRepo: Repository<EmployerProfile> = dataSource.getRepository(EmployerProfile);

  public async search(params: VacancySearchParams): Promise<Vacancy[]> {
    const qb = this.repo.createQueryBuilder('v').leftJoinAndSelect('v.company', 'company');
    if (params.industry) qb.andWhere('v.industry = :industry', { industry: params.industry });
    if (typeof params.salaryMin === 'number') qb.andWhere('(v.salaryMax IS NULL OR v.salaryMax >= :salaryMin)', { salaryMin: params.salaryMin });
    if (typeof params.salaryMax === 'number') qb.andWhere('(v.salaryMin IS NULL OR v.salaryMin <= :salaryMax)', { salaryMax: params.salaryMax });
    if (typeof params.experienceMin === 'number') qb.andWhere('(v.experienceRequired IS NULL OR v.experienceRequired >= :expMin)', { expMin: params.experienceMin });
    if (typeof params.experienceMax === 'number') qb.andWhere('(v.experienceRequired IS NULL OR v.experienceRequired <= :expMax)', { expMax: params.experienceMax });
    qb.orderBy('v.postedDate', 'DESC');
    return qb.getMany();
  }

  public async getById(id: string): Promise<Vacancy> {
    const v = await this.repo.findOne({ where: { id }, relations: { company: true } });
    if (!v) throw new Error(`Vacancy(${id}) not found`); return v;
  }

  private async getEmployerProfileByUserIdOrThrow(userId: string): Promise<EmployerProfile> {
    const ep = await this.employerRepo.findOne({
      where: { userId },
      relations: { company: true }, // важно
    });
    if (!ep) throw new Error('Employer profile not found for current user');
    return ep;
  }

  public async createForEmployer(userId: string, dto: VacancyCreateDto): Promise<Vacancy> {
    const ep = await this.getEmployerProfileByUserIdOrThrow(userId);
    const entity = this.repo.create({ company: ep.company, employerProfile: ep, title: dto.title, description: dto.description, requirements: dto.requirements, salaryMin: dto.salaryMin, salaryMax: dto.salaryMax, industry: dto.industry, experienceRequired: dto.experienceRequired, postedDate: new Date(), expireDate: dto.expireDate });
    return this.repo.save(entity);
  }

  public async updateForEmployer(userId: string, id: string, dto: VacancyUpdateDto): Promise<Vacancy> {
    await this.getEmployerProfileByUserIdOrThrow(userId);
    const v = await this.repo.findOne({ where: { id } }); if (!v) throw new Error(`Vacancy(${id}) not found`);
    Object.assign(v, dto); return this.repo.save(v);
  }

  public async deleteForEmployer(userId: string, id: string): Promise<void> {
    await this.getEmployerProfileByUserIdOrThrow(userId);
    const v = await this.repo.findOne({ where: { id } }); if (!v) throw new Error(`Vacancy(${id}) not found`);
    await this.repo.remove(v);
  }
}
