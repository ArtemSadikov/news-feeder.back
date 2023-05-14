import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NewsEntity } from './news.entity';
import { Exclude } from 'class-transformer';
import { Nullable } from 'src/common/types/nullable';

export type TUserEntityId = string;

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: TUserEntityId;

  @Column('character varying', {
    unique: true,
    nullable: false,
  })
  public email: string;

  @Exclude()
  @Column('character varying', {
    nullable: false,
  })
  public password: string;

  @Exclude()
  @Column('character varying', {
    nullable: true,
    name: 'refresh_token',
  })
  public refreshToken: Nullable<string>;

  @OneToMany(() => NewsEntity, (news) => news.owner, {
    cascade: ['update'],
  })
  public news: NewsEntity[];
}
