import { User } from '../models/user.entity';

export interface IAuthService {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<{ accessToken: string }>;
}

// Injection token for DI container
export const AUTH_SERVICE = Symbol('IAuthService');

