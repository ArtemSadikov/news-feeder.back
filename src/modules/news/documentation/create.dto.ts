import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Optional } from 'src/common/types/optional';

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  public readonly title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly description: Optional<string>;
}
