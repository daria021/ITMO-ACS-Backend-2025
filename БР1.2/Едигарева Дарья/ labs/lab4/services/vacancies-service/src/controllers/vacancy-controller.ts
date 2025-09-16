import { Controller, Get, Post, Patch, Delete, Route, Tags, Query, Path, Body, Security, SuccessResponse, Response, Request } from 'tsoa';
import { VacancyCreateDto, VacancyUpdateDto, VacancySearchParams, IVacancyService, VACANCY_SERVICE } from '../services/vacancy';
import { Vacancy } from '../models/Vacancy';
import { Industry } from '../common/enums';
import { inject, injectable } from 'tsyringe';

@Route('vacancies')
@Tags('Vacancy')
@injectable()
export class VacancyController extends Controller {
  constructor(@inject(VACANCY_SERVICE) private service: IVacancyService) { super(); }

  @Get()
  public async search(
    @Query() industry?: Industry,
    @Query() salaryMin?: number,
    @Query() salaryMax?: number,
    @Query() experienceMin?: number,
    @Query() experienceMax?: number,
  ): Promise<Vacancy[]> {
    const params: VacancySearchParams = { industry, salaryMin, salaryMax, experienceMin, experienceMax };
    return this.service.search(params);
  }

  @Get('{id}')
  public async detail(@Path() id: string): Promise<Vacancy> { return this.service.getById(id); }

  @Security('bearerAuth')
  @Post()
  @SuccessResponse('201')
  @Response<Error>(403, 'Forbidden')
  public async create(@Body() dto: VacancyCreateDto, @Request() req: any): Promise<Vacancy> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    const v = await this.service.createForEmployer(user.id, dto); this.setStatus(201); return v;
  }

  @Security('bearerAuth')
  @Patch('{id}')
  @Response<Error>(403, 'Forbidden')
  public async update(@Path() id: string, @Body() dto: VacancyUpdateDto, @Request() req: any): Promise<Vacancy> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    return this.service.updateForEmployer(user.id, id, dto);
  }

  @Security('bearerAuth')
  @Delete('{id}')
  @SuccessResponse('204')
  @Response<Error>(403, 'Forbidden')
  public async remove(@Path() id: string, @Request() req: any): Promise<void> {
    const user = req?.user as { id: string } | undefined; if (!user?.id) { this.setStatus(401); throw new Error('Unauthorized'); }
    await this.service.deleteForEmployer(user.id, id); this.setStatus(204);
  }
}
