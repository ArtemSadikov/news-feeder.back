import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from 'src/config/config';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cnfSvc: ConfigService<Config>) => {
        return new DatabaseService(cnfSvc).options;
      },
      inject: [ConfigService],
      dataSourceFactory: (opts: DataSourceOptions) => {
        return new DataSource(opts).initialize();
      },
    }),
  ],
  providers: [DatabaseService],
})
export class DatabaseModule {}
