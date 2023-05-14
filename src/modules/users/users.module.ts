import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { UsersController } from './users.controller';
import { NewsModule } from '../news/news.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), NewsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
