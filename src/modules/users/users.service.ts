import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TUserEntityId, UserEntity } from 'src/models/typeorm/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserRequestDto } from './documentation/update.request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  public async findById(id: TUserEntityId): Promise<UserEntity> {
    return this.userRepo.findOneByOrFail({ id });
  }

  public async findUser(id: TUserEntityId): Promise<UserEntity> {
    return this.userRepo.findOneOrFail({
      where: { id },
      relations: { news: true },
    });
  }

  public async createUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    return this.userRepo.create({ email, password }).save();
  }

  public async updateUser(
    id: TUserEntityId,
    data: UpdateUserRequestDto,
  ): Promise<UserEntity> {
    const user = await this.userRepo.findOneByOrFail({ id });

    const updated = this.userRepo.merge(user, data);

    return updated.save();
  }

  public async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepo.findOneByOrFail({ email });
  }
}
