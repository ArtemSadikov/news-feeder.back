import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  public readonly email: string;

  @ApiProperty()
  public readonly password: string;
}
