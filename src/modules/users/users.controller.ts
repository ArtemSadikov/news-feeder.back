import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/guards/access.guard';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserDetailResponseDto } from './documentation/user.detail.response.dto';

@UseGuards(AccessTokenGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  public async me(
    @CurrentUser() user: UserEntity,
  ): Promise<UserDetailResponseDto> {
    const res = await this.usersService.findUser(user.id);
    return UserDetailResponseDto.of(res);
  }
}
