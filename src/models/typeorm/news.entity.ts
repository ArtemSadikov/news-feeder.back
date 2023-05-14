import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { Nullable } from 'src/common/types/nullable';

export type TNewsEntityId = string;

@Entity('news')
export class NewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: TNewsEntityId;

  @Column('character varying', {
    nullable: false,
  })
  public title: string;

  @Column('character varying', {
    nullable: true,
  })
  public description: string;

  @ManyToOne(() => UserEntity, (user) => user.news, {
    cascade: ['update'],
    eager: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  public owner: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  public deletedAt: Nullable<Date>;
}
