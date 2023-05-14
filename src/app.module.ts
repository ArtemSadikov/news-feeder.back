import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TokenService } from './modules/token/token.service';
import { TokenModule } from './modules/token/token.module';
import config from './config/config';
import { JwtModule } from '@nestjs/jwt';
import { NewsController } from './modules/news/news.controller';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UsersModule,
    AuthModule,
    DatabaseModule,
    JwtModule,
    TokenModule,
    NewsModule,
  ],
  controllers: [AppController, NewsController],
  providers: [AppService, TokenService],
})
export class AppModule {}
