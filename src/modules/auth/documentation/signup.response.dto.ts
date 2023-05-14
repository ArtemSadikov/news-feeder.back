import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { UserDetailResponseDto } from 'src/modules/users/documentation/user.detail.response.dto';

export class SignupResponseDto {
  @Expose()
  @ApiProperty()
  public readonly refreshToken: string;

  @Expose()
  @ApiProperty()
  public readonly accessToken: string;

  @Expose()
  @ApiProperty({ type: UserDetailResponseDto, name: 'user' })
  public readonly user: UserDetailResponseDto;

  public static of(
    user: UserEntity,
    accessToken: string,
    refreshToken: string,
  ): SignupResponseDto {
    return plainToInstance(SignupResponseDto, {
      user: UserDetailResponseDto.of(user),
      accessToken,
      refreshToken,
    });
  }
}
