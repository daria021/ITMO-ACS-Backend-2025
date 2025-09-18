import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'educations' })
export class Education extends BaseEntity {
  @Column({ name: 'resume_id' })
  resumeId!: string;

  @Column()
  institution!: string;

  @Column()
  degree!: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate!: string;

  @Column({ name: 'end_date', type: 'date', nullable: true })
  endDate?: string | null;
}


