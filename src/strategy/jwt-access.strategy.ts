import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from 'src/config/config';
import { AccessTokenPayload } from 'src/modules/token/interfaces/token.payload.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: AccessTokenPayload) {
    try {
      return await this.usersService.findById(payload.userId);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
