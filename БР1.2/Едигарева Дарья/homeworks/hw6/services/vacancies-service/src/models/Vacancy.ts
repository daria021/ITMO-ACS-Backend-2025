import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './Company';
import { EmployerProfile } from './EmployerProfile';
import { Industry } from '../common/enums';

@Entity({ name: 'vacancies' })
export class Vacancy {
  @PrimaryGeneratedColumn('uuid') id!: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt!: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt!: Date;

  @ManyToOne(() => Company, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'company_id' })
  company!: Company;

  @ManyToOne(() => EmployerProfile, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employer_profile_id' })
  employerProfile!: EmployerProfile;

  @Column() title!: string;
  @Column({ type: 'text' }) description!: string;
  @Column({ type: 'text', nullable: true }) requirements?: string;
  @Column({ name: 'salary_min', type: 'numeric', nullable: true }) salaryMin?: number;
  @Column({ name: 'salary_max', type: 'numeric', nullable: true }) salaryMax?: number;
  @Column({ type: 'enum', enum: Industry, enumName: 'industry', default: Industry.Other }) industry!: Industry;
  @Column({ name: 'experience_required', type: 'integer', nullable: true }) experienceRequired?: number;
  @Column({ name: 'posted_date', type: 'timestamptz' }) postedDate!: Date;
  @Column({ name: 'expire_date', type: 'timestamptz', nullable: true }) expireDate?: Date;
}


