import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import SETTINGS from '../config/settings';
import dataSource from '../config/data-source';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import { singleton } from 'tsyringe';
import { IAuthService } from './auth.types';

@singleton()
export class AuthService implements IAuthService {
  private readonly userRepo: Repository<User>;
  constructor() {
    this.userRepo = dataSource.getRepository(User);
  }

  public async register(email: string, password: string): Promise<User> {
    const existing = await this.userRepo.findOne({ where: { email } });
    if (existing) throw new Error('Email already in use');
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepo.create({ email, passwordHash: hash });
    return this.userRepo.save(user);
  }

  public async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');
    const token = jwt.sign({ id: user.id, email: user.email }, SETTINGS.JWT_SECRET_KEY, { expiresIn: 60 * 5 });
    return { accessToken: token };
  }
}
