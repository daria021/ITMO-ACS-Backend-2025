import { Body, Controller, Delete, Get, Path, Post, Patch, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { Company } from '../models/Company';
import { CompanyCreateDto, CompanyUpdateDto, ICompanyService, COMPANY_SERVICE } from '../services/company';
import { inject, injectable } from 'tsyringe';

@Route('companies')
@Tags('Company')
@injectable()
export class CompanyController extends Controller {
  constructor(@inject(COMPANY_SERVICE) private service: ICompanyService) { super(); }

  @Get()
  public async list(): Promise<Company[]> { return this.service.list(); }

  @Get('{id}')
  public async detail(@Path() id: string): Promise<Company> { return this.service.getById(id); }

  @Post()
  @SuccessResponse('201')
  @Response<Error>(400, 'Bad Request')
  public async create(@Body() dto: CompanyCreateDto): Promise<Company> {
    const c = await this.service.create(dto);
    this.setStatus(201);
    return c;
  }

  @Patch('{id}')
  public async update(@Path() id: string, @Body() dto: CompanyUpdateDto): Promise<Company> { return this.service.update(id, dto); }

  @Delete('{id}')
  @SuccessResponse('204')
  public async remove(@Path() id: string): Promise<void> { await this.service.remove(id); this.setStatus(204); }
}
