import { ApiProperty } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { NewsEntity, TNewsEntityId } from 'src/models/typeorm/news.entity';
import { UserDetailResponseDto } from 'src/modules/users/documentation/user.detail.response.dto';

export class NewsDetailDto {
  @ApiProperty()
  public readonly id: TNewsEntityId;

  @ApiProperty()
  public readonly title: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  public readonly owner: UserDetailResponseDto;

  public static of(news: NewsEntity): NewsDetailDto {
    return plainToInstance(NewsDetailDto, news);
  }
}
