import { Body, Controller, Get, Post, Put, Request, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { ProfileCreateDto, ProfileUpdateDto, IProfileService, PROFILE_SERVICE } from '../services/profile';
import { JobSeekerProfile } from '../models/JobSeekerProfile';
import { inject, injectable } from 'tsyringe';

@Route('me/profile')
@Tags('Profile')
@Security('bearerAuth')
@injectable()
export class ProfileController extends Controller {
  constructor(@inject(PROFILE_SERVICE) private service: IProfileService) { super(); }

  @Get()
  public async get(@Request() req: any): Promise<JobSeekerProfile> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const p = await this.service.getMy(user.id);
    if (!p) { this.setStatus(404); throw new Error('Profile not found'); }
    return p;
  }

  @Post()
  @SuccessResponse('201')
  @Response<Error>(400, 'Bad Request')
  public async create(@Body() dto: ProfileCreateDto, @Request() req: any): Promise<JobSeekerProfile> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const p = await this.service.createForUser(user.id, dto);
    this.setStatus(201);
    return p;
  }

  @Put()
  public async update(@Body() dto: ProfileUpdateDto, @Request() req: any): Promise<JobSeekerProfile> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    return this.service.updateMy(user.id, dto);
  }
}
