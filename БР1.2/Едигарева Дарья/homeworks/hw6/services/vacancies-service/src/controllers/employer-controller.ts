import { Body, Controller, Get, Post, Request, Response, Route, Security, SuccessResponse, Tags } from 'tsoa';
import { EmployerCreateDto, IEmployerService, EMPLOYER_SERVICE } from '../services/employer';
import { EmployerProfile } from '../models/EmployerProfile';
import { inject, injectable } from 'tsyringe';

@Route('me/employer')
@Tags('Employer')
@Security('bearerAuth')
@injectable()
export class EmployerController extends Controller {
  constructor(@inject(EMPLOYER_SERVICE) private service: IEmployerService) { super(); }

  @Get()
  public async get(@Request() req: any): Promise<EmployerProfile> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const p = await this.service.getMy(user.id);
    if (!p) { this.setStatus(404); throw new Error('Employer profile not found'); }
    return p;
  }

  @Post()
  @SuccessResponse('201')
  @Response<Error>(400, 'Bad Request')
  public async create(@Body() dto: EmployerCreateDto, @Request() req: any): Promise<EmployerProfile> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const p = await this.service.createForUser(user.id, dto);
    this.setStatus(201);
    return p;
  }
}
