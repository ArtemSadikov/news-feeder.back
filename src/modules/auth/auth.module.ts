import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { JwtAccessStrategy } from 'src/strategy/jwt-access.strategy';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from 'src/strategy/jwt-refresh.strategy';
import { CredentialsStrategy } from 'src/strategy/credentials.stategy';

@Module({
  imports: [UsersModule, TokenModule],
  providers: [
    AuthService,
    CredentialsStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
