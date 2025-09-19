import { Body, Controller, Post, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { IAuthService, AUTH_SERVICE } from '../services/auth.types';
import { inject, injectable } from 'tsyringe';
import { User } from '../models/user.entity';

interface RegisterRequest { email: string; password: string; }
interface LoginRequest { email: string; password: string; }
interface AuthResponse { accessToken: string; }

@Route('') // Base route for auth
@Tags('Auth')
@injectable()
export class AuthController extends Controller {
  constructor(@inject(AUTH_SERVICE) private service: IAuthService) { super(); }

  @Post('register')
  @SuccessResponse('201', 'Created')
  @Response<Error>(400, 'Bad Request')
  public async register(@Body() body: RegisterRequest): Promise<User> {
    const user = await this.service.register(body.email, body.password);
    this.setStatus(201);
    return user;
  }

  @Post('login')
  @SuccessResponse('200', 'OK')
  @Response<Error>(401, 'Unauthorized')
  public async login(@Body() body: LoginRequest): Promise<AuthResponse> {
    return this.service.login(body.email, body.password);
  }
}
