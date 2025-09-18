import { MessageBroker } from './message-broker';

export const QUEUES = {
  USER_REGISTERED: 'user.registered',
  EMPLOYER_PROFILE_CREATED: 'employer.profile.created',
  RESUME_UPDATED: 'resume.updated',
} as const;

export const broker = new MessageBroker();

interface ResumeUpdatedPayload {
  userId: string;
  resumeId: string;
  action: string;
  [key: string]: unknown;
}

export async function initMessaging(): Promise<void> {
  await broker.connect();
  await broker.consume<ResumeUpdatedPayload>(QUEUES.RESUME_UPDATED, async (payload) => {
    if (!payload?.userId || !payload?.resumeId) {
      console.warn('[vacancies-service] resume.updated payload missing userId or resumeId');
      return;
    }
    console.log('[vacancies-service] resume.updated received', payload);
  });
}

