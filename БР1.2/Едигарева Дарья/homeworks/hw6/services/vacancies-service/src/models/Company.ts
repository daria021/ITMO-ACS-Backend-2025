import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Industry } from '../common/enums';

@Entity({ name: 'companies' })
export class Company {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt!: Date;

  @Column({ unique: true }) name!: string;
  @Column({ type: 'text', nullable: true }) description?: string;
  @Column({ type: 'enum', enum: Industry, enumName: 'industry', default: Industry.Other }) industry!: Industry;
  @Column({ nullable: true }) website?: string;
  @Column({ nullable: true }) address?: string;
  @Column({ nullable: true }) phone?: string;
  @Column({ nullable: true }) email?: string;
  @Column({ name: 'founded_date', type: 'date', nullable: true }) foundedDate?: string;
  @Column({ name: 'employees_count', type: 'integer', nullable: true }) employeesCount?: number;
}


