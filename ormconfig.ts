import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as path from 'path';

config();

export default new DataSource({
  type: 'postgres',
  username: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  entities: [path.join('src', 'models', 'typeorm', '**/*.entity.ts')],
  migrations: [path.join('src', 'database', 'migrations', '**/*.ts')],
  namingStrategy: new SnakeNamingStrategy(),
});
