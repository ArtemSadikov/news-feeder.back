import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Config } from 'src/config/config';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
} from './interfaces/token.payload.interface';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Config>,
  ) {}

  public async generateAccessToken(userId: string): Promise<string> {
    return this.generateJwtToken(
      { userId },
      this.configService.getOrThrow('JWT_ACCESS_SECRET'),
      this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
    );
  }

  public async generateRefreshToken(
    userId: string,
    email: string,
  ): Promise<string> {
    return this.generateJwtToken(
      { userId, email },
      this.configService.getOrThrow('JWT_REFRESH_SECRET'),
      this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
    );
  }

  private async generateJwtToken<
    T extends AccessTokenPayload | RefreshTokenPayload,
  >(payload: T, secret: string, expiresIn: string): Promise<string> {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
