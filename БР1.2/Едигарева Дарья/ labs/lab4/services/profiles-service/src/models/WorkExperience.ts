import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'work_experiences' })
export class WorkExperience extends BaseEntity {
  @Column({ name: 'resume_id' })
  resumeId!: string;

  @Column()
  company!: string;

  @Column()
  title!: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: string | null;

  @Column({ type: 'text', nullable: true })
  description?: string | null;
}


