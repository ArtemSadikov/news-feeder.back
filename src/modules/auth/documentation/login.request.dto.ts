import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({ type: String, name: 'email' })
  public readonly email: string;

  @ApiProperty({ type: String, name: 'password' })
  public readonly password: string;
}
