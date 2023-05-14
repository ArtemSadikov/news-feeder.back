import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Config } from 'src/config/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService {
  private readonly _config: Config['DB'];

  constructor(private readonly configService: ConfigService<Config>) {
    const cnf = this.configService.get('DB');
    if (!cnf) {
      throw new Error('');
    }

    this._config = cnf;
  }

  public get options(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.HOST,
      username: this.config.USER_NAME,
      password: this.config.PASSWORD,
      database: this.config.NAME,
      port: this.config.PORT,
      entities: [
        path.join(__dirname, '..', 'models', 'typeorm', '**/*.entity.js'),
      ],
    };
  }

  public get config(): Config['DB'] {
    return this._config;
  }

  public getDataSource(): DataSource {
    return new DataSource({
      type: 'postgres',
      username: this.config.USER_NAME,
      port: this.config.PORT,
      host: this.config.HOST,
      database: this.config.NAME,
      password: this.config.PASSWORD,
      entities: [path.join('..', 'models', 'typeorm', '**/*.entity.ts')],
      migrations: [path.join('..', 'database', 'migrations', '**/*.ts')],
      namingStrategy: new SnakeNamingStrategy(),
    });
  }
}
