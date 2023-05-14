import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Config } from 'src/config/config';
import { AuthService } from 'src/modules/auth/auth.service';
import { RefreshTokenPayload } from 'src/modules/token/interfaces/token.payload.interface';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService<Config>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: RefreshTokenPayload) {
    try {
      const user = await this.authService.validateJwtUser(
        payload.userId,
        payload.email,
      );
      const refreshToken = req.headers['authorization']
        ?.replace('Bearer', '')
        .trim();

      return { ...user, authToken: refreshToken };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
