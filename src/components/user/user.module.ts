import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TrainRepository } from '../../train/repository/TrainRepository';
import { TrainService } from '../../train/train.service';
import { AuthInfo } from '../../auth/auth-info';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TrainRepository]), JwtModule],
  controllers: [UserController],
  providers: [UserService, TrainService, AuthInfo],
})
export class UserModule {}
