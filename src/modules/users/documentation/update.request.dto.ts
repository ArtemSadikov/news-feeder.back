import { PartialType, PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create.request.dto';
import { Nullable } from 'src/common/types/nullable';

export class UpdateUserRequestDto extends PartialType(
  PickType(CreateUserDto, ['email']),
) {
  public readonly refreshToken?: Nullable<string>;
}
