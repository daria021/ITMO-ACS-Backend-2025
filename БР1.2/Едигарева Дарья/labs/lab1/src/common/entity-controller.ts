import { Controller, Get, Post, Put, Delete, Route, Path, Body, Security } from 'tsoa';
import { Repository } from 'typeorm';
import { BaseController } from './base-controller';

export abstract class EntityController<T extends { id: string }> extends BaseController {
  protected abstract readonly repository: Repository<T>;
  protected abstract readonly routeName: string;

  @Security('bearerAuth')
  @Get()
  public async getAll(): Promise<T[]> {
    return this.repository.find();
  }

  @Security('bearerAuth')
  @Get('{id}')
  public async getById(@Path() id: string): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      this.setStatus(404);
      throw new Error(`${this.routeName} not found`);
    }
    return entity;
  }

  @Security('bearerAuth')
  @Post()
  public async create(@Body() data: Omit<T, 'id'>): Promise<T> {
    const entity = this.repository.create(data as any);
    const saved = await this.repository.save(entity) as unknown as T;
    this.setStatus(201);
    return saved;
  }

  @Security('bearerAuth')
  @Put('{id}')
  public async update(@Path() id: string, @Body() data: Partial<T>): Promise<T> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      this.setStatus(404);
      throw new Error(`${this.routeName} not found`);
    }
    await this.repository.update(id, data as any);
    return this.repository.findOne({ where: { id } as any }) as Promise<T>;
  }

  @Security('bearerAuth')
  @Delete('{id}')
  public async delete(@Path() id: string): Promise<void> {
    const entity = await this.repository.findOne({ where: { id } as any });
    if (!entity) {
      this.setStatus(404);
      throw new Error(`${this.routeName} not found`);
    }
    await this.repository.delete(id);
    this.setStatus(204);
  }
}
