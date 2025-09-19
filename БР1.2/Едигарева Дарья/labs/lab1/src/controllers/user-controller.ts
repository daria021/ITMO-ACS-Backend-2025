import { Controller, Get, Route, Security, Tags, Request } from 'tsoa';
import { Repository } from 'typeorm';
import dataSource from '../config/data-source';
import { User } from '../models/user.entity';

@Route('users')
@Tags('Users')
export class UserController extends Controller {
  private userRepo = dataSource.getRepository(User);

  @Security('bearerAuth')
  @Get('profile')
  public async getProfile(@Request() req: any): Promise<User> {
    const userId = req.user?.id;
    if (!userId) {
      this.setStatus(401);
      throw new Error('Unauthorized');
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }
    return user;
  }
}
