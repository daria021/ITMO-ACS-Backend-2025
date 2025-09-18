import '../ioc';
import { container } from 'tsyringe';
import { MessageBroker } from './message-broker';
import { IProfileService, PROFILE_SERVICE } from '../services/profile';

export const QUEUES = {
  USER_REGISTERED: 'user.registered',
  EMPLOYER_PROFILE_CREATED: 'employer.profile.created',
  RESUME_UPDATED: 'resume.updated',
} as const;

export const broker = new MessageBroker();

interface UserRegisteredPayload {
  id: string;
  email?: string;
}

export async function initMessaging(): Promise<void> {
  await broker.connect();
  await broker.consume<UserRegisteredPayload>(QUEUES.USER_REGISTERED, async (payload) => {
    if (!payload?.id) {
      console.warn('[profiles-service] user.registered payload without id');
      return;
    }
    try {
      const profileService = container.resolve<IProfileService>(PROFILE_SERVICE);
      const existing = await profileService.getMy(payload.id);
      if (existing) {
        return;
      }
      const fallbackName = payload.email ?? 'New user';
      await profileService.createForUser(payload.id, { fullName: fallbackName });
      console.log(`[profiles-service] Auto-created profile for ${payload.id}`);
    } catch (err) {
      console.error('[profiles-service] Failed to create profile from user.registered', err);
    }
  });
}
