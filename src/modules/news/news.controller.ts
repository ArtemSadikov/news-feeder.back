import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './documentation/create.dto';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { NewsDetailDto } from './documentation/news.detail.dto';
import { UpdateNewsDto } from './documentation/update.dto';
import { PaginationDto } from 'src/common/utils/pagination';
import { AccessTokenGuard } from 'src/guards/access.guard';
import { ListNewsFilterDto } from './documentation/list.filter.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @UseGuards(AccessTokenGuard)
  @Post('/')
  public async create(
    @Body() body: CreateNewsDto,
    @CurrentUser() user: UserEntity,
  ): Promise<NewsDetailDto> {
    const result = await this.newsService.create(body, user);
    return NewsDetailDto.of(result);
  }

  @UseGuards(AccessTokenGuard)
  @Patch('/:id')
  public async edit(
    @Param('id') id: string,
    @Body() body: UpdateNewsDto,
    @CurrentUser() user: UserEntity,
  ): Promise<NewsDetailDto> {
    const res = await this.newsService.update(id, body, user);
    return NewsDetailDto.of(res);
  }

  @Get('/:id')
  public async getById(@Param('id') id: string): Promise<NewsDetailDto> {
    const res = await this.newsService.findById(id);
    return NewsDetailDto.of(res);
  }

  @Get('/')
  public async getList(
    @Query() pagination: PaginationDto,
    @Query() filters: ListNewsFilterDto,
  ) {
    const [res, count] = await this.newsService.findList(pagination, filters);
    return res.map(NewsDetailDto.of);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('/:id')
  public async delete(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ): Promise<NewsDetailDto> {
    const res = await this.newsService.remove(id, user);
    return NewsDetailDto.of(res);
  }
}
