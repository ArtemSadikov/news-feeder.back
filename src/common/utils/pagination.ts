import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  @IsNumber()
  public readonly limit: number = 10;

  @ApiProperty()
  @IsNumber()
  public readonly offset: number = 0;

  public get skip(): number {
    return this.limit * this.offset;
  }
}
