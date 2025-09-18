import dataSource from '../config/data-source';
import { User } from '../models/User';
import { UserRole } from '../models/enums';
import { MessageBroker } from './message-broker';

export const QUEUES = {
  USER_REGISTERED: 'user.registered',
  EMPLOYER_PROFILE_CREATED: 'employer.profile.created',
  RESUME_UPDATED: 'resume.updated',
} as const;

export const broker = new MessageBroker();

interface EmployerProfileCreatedPayload {
  userId: string;
  companyId?: string;
  phone?: string;
}

export async function initMessaging(): Promise<void> {
  await broker.connect();
  await broker.consume<EmployerProfileCreatedPayload>(QUEUES.EMPLOYER_PROFILE_CREATED, async (payload) => {
    if (!payload?.userId) {
      console.warn('[auth-service] employer.profile.created payload without userId');
      return;
    }
    try {
      const repo = dataSource.getRepository(User);
      await repo.update({ id: payload.userId }, { role: UserRole.Employer });
      console.log(`[auth-service] Role updated to employer for user ${payload.userId}`);
    } catch (err) {
      console.error('[auth-service] Failed to update user role from employer event', err);
    }
  });
}

