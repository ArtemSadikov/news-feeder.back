import { IsOptional, IsString } from 'class-validator';
import { Optional } from 'src/common/types/optional';

export class ListNewsFilterDto {
  @IsString()
  @IsOptional()
  public readonly ownerId: Optional<string>;

  @IsString()
  @IsOptional()
  public readonly title: Optional<string>;
}
