import { Body, Controller, Delete, Get, Path, Post, Put, Request, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import dataSource from '../config/data-source';
import { Repository } from 'typeorm';
import { Resume } from '../models/Resume';
import { WorkExperience } from '../models/WorkExperience';
import { Education } from '../models/Education';
import { JobSeekerProfile } from '../models/JobSeekerProfile';
import { broker, QUEUES } from '../messaging';

interface ResumeCreateDto { resumePath: string }
interface ResumeUpdateDto { resumePath?: string }
interface ExperienceCreateDto { company: string; title: string; startDate: string; endDate?: string; description?: string }
interface EducationCreateDto { institution: string; degree: string; startDate: string; endDate?: string }

@Route('me/resumes')
@Tags('Resume')
@Security('bearerAuth')
export class ResumeController extends Controller {
  private readonly resumes: Repository<Resume> = dataSource.getRepository(Resume);
  private readonly experiences: Repository<WorkExperience> = dataSource.getRepository(WorkExperience);
  private readonly educations: Repository<Education> = dataSource.getRepository(Education);
  private readonly profiles: Repository<JobSeekerProfile> = dataSource.getRepository(JobSeekerProfile);

  private async publishResumeEvent(userId: string, resumeId: string, action: string, meta: Record<string, unknown> = {}): Promise<void> {
    try {
      await broker.publish(QUEUES.RESUME_UPDATED, { userId, resumeId, action, ...meta });
    } catch (err) {
      console.error('[profiles-service] Failed to publish resume.updated event', err);
    }
  }

  private async getProfileOrThrow(userId: string): Promise<JobSeekerProfile> {
    const p = await this.profiles.findOne({ where: { userId } });
    if (!p) { this.setStatus(404); throw new Error('Profile not found'); }
    return p;
  }

  @Get()
  public async list(@Request() req: any): Promise<Resume[]> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const profile = await this.getProfileOrThrow(user.id);
    return this.resumes.find({ where: { profileId: profile.id } });
  }

  @Post()
  @SuccessResponse('201')
  public async create(@Body() dto: ResumeCreateDto, @Request() req: any): Promise<Resume> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const profile = await this.getProfileOrThrow(user.id);
    const entity = this.resumes.create({ profileId: profile.id, resumePath: dto.resumePath });
    const saved = await this.resumes.save(entity);
    this.setStatus(201);
    await this.publishResumeEvent(user.id, saved.id, 'created');
    return saved;
  }

  @Put('{id}')
  public async update(@Path() id: string, @Body() dto: ResumeUpdateDto, @Request() req: any): Promise<Resume> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const profile = await this.getProfileOrThrow(user.id);
    const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
    if (!r) { this.setStatus(404); throw new Error('Resume not found'); }
    if (dto.resumePath !== undefined) r.resumePath = dto.resumePath;
    const updated = await this.resumes.save(r);
    await this.publishResumeEvent(user.id, updated.id, 'updated');
    return updated;
  }

  @Delete('{id}')
  @SuccessResponse('204')
  public async remove(@Path() id: string, @Request() req: any): Promise<void> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const profile = await this.getProfileOrThrow(user.id);
    const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
    if (!r) { this.setStatus(404); throw new Error('Resume not found'); }
    await this.resumes.delete(r.id);
    await this.publishResumeEvent(user.id, r.id, 'deleted');
    this.setStatus(204);
  }

  @Post('{id}/experiences')
  @SuccessResponse('201')
  public async addExperience(@Path() id: string, @Body() dto: ExperienceCreateDto, @Request() req: any): Promise<WorkExperience> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const profile = await this.getProfileOrThrow(user.id);
    const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
    if (!r) { this.setStatus(404); throw new Error('Resume not found'); }
    const exp = this.experiences.create({ resumeId: r.id, company: dto.company, title: dto.title, startDate: dto.startDate, endDate: dto.endDate, description: dto.description });
    const saved = await this.experiences.save(exp);
    this.setStatus(201);
    await this.publishResumeEvent(user.id, r.id, 'experience_added', { experienceId: saved.id });
    return saved;
  }

  @Post('{id}/educations')
  @SuccessResponse('201')
  public async addEducation(@Path() id: string, @Body() dto: EducationCreateDto, @Request() req: any): Promise<Education> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const profile = await this.getProfileOrThrow(user.id);
    const r = await this.resumes.findOne({ where: { id, profileId: profile.id } });
    if (!r) { this.setStatus(404); throw new Error('Resume not found'); }
    const ed = this.educations.create({ resumeId: r.id, institution: dto.institution, degree: dto.degree, startDate: dto.startDate, endDate: dto.endDate });
    const saved = await this.educations.save(ed);
    this.setStatus(201);
    await this.publishResumeEvent(user.id, r.id, 'education_added', { educationId: saved.id });
    return saved;
  }
}

