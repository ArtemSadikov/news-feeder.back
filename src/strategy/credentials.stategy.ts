import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class CredentialsStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public async validate(email: string, password: string): Promise<UserEntity> {
    try {
      return this.authService.validateLocalUser(email, password);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
