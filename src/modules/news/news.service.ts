import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/models/typeorm/news.entity';
import { UserEntity } from 'src/models/typeorm/user.entity';
import { Equal, FindManyOptions, ILike, Repository } from 'typeorm';
import { CreateNewsDto } from './documentation/create.dto';
import { UpdateNewsDto } from './documentation/update.dto';
import { PaginationDto } from 'src/common/utils/pagination';
import { ListNewsFilterDto } from './documentation/list.filter.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepo: Repository<NewsEntity>,
  ) {}

  public async create(
    news: CreateNewsDto,
    owner: UserEntity,
  ): Promise<NewsEntity> {
    return this.newsRepo.create({ ...news, owner }).save();
  }

  public async update(
    id: string,
    news: UpdateNewsDto,
    owner: UserEntity,
  ): Promise<NewsEntity> {
    const exists = await this.newsRepo.findOneByOrFail({
      id,
      owner: Equal(owner.id),
    });

    const updated = this.newsRepo.merge(exists, news);
    return updated.save();
  }

  public async remove(id: string, owner: UserEntity): Promise<NewsEntity> {
    const exists = await this.newsRepo.findOneByOrFail({
      id,
      owner: Equal(owner.id),
    });

    return exists.remove();
  }

  public async findById(id: string): Promise<NewsEntity> {
    return this.newsRepo.findOneByOrFail({ id });
  }

  public async findList(
    pagination: PaginationDto,
    filters: ListNewsFilterDto,
  ): Promise<[NewsEntity[], number]> {
    const where: FindManyOptions<NewsEntity>['where'] = {};

    if (filters.ownerId) {
      where.owner = Equal(filters.ownerId);
    }

    if (filters.title) {
      where.title = ILike(`%${filters.title}%`);
    }

    return this.newsRepo.findAndCount({
      where,
      take: pagination.limit,
      skip: pagination.skip,
    });
  }
}
