import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({ type: String, required: true })
  public readonly accessToken: string;

  @ApiProperty()
  public readonly refreshToken: string;
}
