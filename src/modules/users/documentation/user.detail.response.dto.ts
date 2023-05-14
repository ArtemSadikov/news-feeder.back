import { ApiProperty } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { TUserEntityId, UserEntity } from 'src/models/typeorm/user.entity';

export class UserDetailResponseDto {
  @ApiProperty()
  public readonly id: TUserEntityId;

  @ApiProperty()
  public readonly email: string;

  public static of(user: UserEntity): UserDetailResponseDto {
    const plain = instanceToPlain(user);
    return plainToInstance(UserDetailResponseDto, plain);
  }
}
