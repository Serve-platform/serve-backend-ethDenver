import { Module } from '@nestjs/common';
import { UserModule } from './components/user/user.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './core/config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './core/config/typeorm.config';
import { AppController } from './components/sample/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfig,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
