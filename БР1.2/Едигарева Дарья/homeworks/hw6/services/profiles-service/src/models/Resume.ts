import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity({ name: 'resumes' })
export class Resume extends BaseEntity {
  @Column({ name: 'profile_id' })
  profileId!: string;

  @Column({ name: 'resume_path' })
  resumePath!: string;
}


