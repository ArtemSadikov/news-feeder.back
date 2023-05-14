import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { TUserEntityId, UserEntity } from 'src/models/typeorm/user.entity';
import { TokenService } from '../token/token.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config';
import { LoginResponseDto } from './documentation/login.response.dto';
import { LoginRequestDto } from './documentation/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Config>,
  ) {}

  public async validateLocalUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(email);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new NotAcceptableException();
    }

    return user;
  }

  public async validateJwtUser(
    userId: string,
    email: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findById(userId);

    if (!user || email != user.email) {
      throw new NotAcceptableException();
    }

    return user;
  }

  public async signup(
    email: string,
    password: string,
  ): Promise<{ user: UserEntity; accessToken: string; refreshToken: string }> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.createUser(email, hashedPassword);
    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return { user, ...tokens };
  }

  public async login(user: UserEntity): Promise<LoginResponseDto> {
    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  public async refreshToken(
    user: UserEntity,
    refreshToken: string,
  ): Promise<LoginResponseDto> {
    if (!user.refreshToken) {
      throw new NotAcceptableException();
    }
    const isValid = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!isValid) {
      throw new NotAcceptableException();
    }
    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  private async updateRefreshToken(id: string, token: string): Promise<void> {
    await this.usersService.updateUser(id, {
      refreshToken: bcrypt.hashSync(token, 10),
    });
  }

  private async generateTokens(
    user: UserEntity,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.tokenService.generateAccessToken(user.id);

    const refreshToken = await this.tokenService.generateRefreshToken(
      user.id,
      user.email,
    );

    return { accessToken, refreshToken };
  }

  public async logout(user: UserEntity): Promise<UserEntity> {
    return this.usersService.updateUser(user.id, { refreshToken: null });
  }
}
