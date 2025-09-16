import dataSource from '../config/data-source';
import { Repository } from 'typeorm';
import { JobSeekerProfile } from '../models/JobSeekerProfile';
import { singleton } from 'tsyringe';

export interface ProfileCreateDto { fullName: string; }
export interface ProfileUpdateDto { fullName?: string; }

export interface IProfileService {
  getMy(userId: string): Promise<JobSeekerProfile | null>;
  createForUser(userId: string, dto: ProfileCreateDto): Promise<JobSeekerProfile>;
  updateMy(userId: string, dto: ProfileUpdateDto): Promise<JobSeekerProfile>;
}

export const PROFILE_SERVICE = Symbol('IProfileService');

@singleton()
export class ProfileService implements IProfileService {
  private repo: Repository<JobSeekerProfile> = dataSource.getRepository(JobSeekerProfile);

  async getMy(userId: string): Promise<JobSeekerProfile | null> {
    return this.repo.findOne({ where: { userId } });
  }

  async createForUser(userId: string, dto: ProfileCreateDto): Promise<JobSeekerProfile> {
    const existing = await this.getMy(userId);
    if (existing) { throw new Error('Profile already exists'); }
    const entity = this.repo.create({ userId, fullName: dto.fullName });
    return this.repo.save(entity);
  }

  async updateMy(userId: string, dto: ProfileUpdateDto): Promise<JobSeekerProfile> {
    const p = await this.getMy(userId);
    if (!p) { throw new Error('Profile not found'); }
    if (dto.fullName !== undefined) p.fullName = dto.fullName;
    return this.repo.save(p);
  }
}
