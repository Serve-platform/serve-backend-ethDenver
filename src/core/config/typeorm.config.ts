import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const database = this.configService.get('database');
    return {
      type: database.dbType,
      host: database.dbHost,
      port: database.dbPort,
      username: database.dbUserName,
      password: database.dbPassword,
      database: database.dbName,
      trace: true,
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      migrations: ['dist/**/**/*.entity{.ts,.js}'],
      synchronize: database.dbSynchronize,
      timezone: 'Z',
      logging: false,
      charset: 'utf8mb4',
      ssl: false,
    };
  }
}
