import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'job_seeker_profiles' })
export class JobSeekerProfile extends BaseEntity {
  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'full_name' })
  fullName!: string;
}


