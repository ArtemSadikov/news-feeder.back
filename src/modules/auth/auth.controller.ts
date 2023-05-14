import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginResponseDto } from './documentation/login.response.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { SignupResponseDto } from './documentation/signup.response.dto';
import { SignupRequestDto } from './documentation/signup.request.dto';
import { RefreshTokenGuard } from 'src/guards/refresh.guard';
import { AccessTokenGuard } from 'src/guards/access.guard';
import { UserDetailResponseDto } from '../users/documentation/user.detail.response.dto';
import { CredentialsGuard } from 'src/guards/credentials.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(CredentialsGuard)
  @Post('/login')
  public async login(
    @CurrentUser() user: UserEntity,
  ): Promise<LoginResponseDto> {
    return this.authService.login(user);
  }

  @Post('/signup')
  public async signup(
    @Body() body: SignupRequestDto,
  ): Promise<SignupResponseDto> {
    const res = await this.authService.signup(body.email, body.password);
    return SignupResponseDto.of(res.user, res.accessToken, res.refreshToken);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  public async refresh(
    @CurrentUser() user: UserEntity,
    @Request() req: any,
  ): Promise<LoginResponseDto> {
    return this.authService.refreshToken(user, req.user['authToken']);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/logout')
  public async logout(
    @CurrentUser() user: UserEntity,
  ): Promise<UserDetailResponseDto> {
    const res = await this.authService.logout(user);
    return UserDetailResponseDto.of(res);
  }
}
