import { User } from '../models/User';

export interface IAuthService {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<{ accessToken: string }>;
}

// Injection token for DI container
export const AUTH_SERVICE = Symbol('IAuthService');

