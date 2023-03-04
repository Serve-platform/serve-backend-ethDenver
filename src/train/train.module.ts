import { Module } from '@nestjs/common';
import { TrainService } from './train.service';
import { TrainController } from './train.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatRepository } from '../seat/repository/SeatRepository';
import { JwtModule } from '@nestjs/jwt';
import { AuthInfo } from '../auth/auth-info';
import { TrainRepository } from './repository/TrainRepository';

@Module({
  imports: [TypeOrmModule.forFeature([TrainRepository]),
    JwtModule, AuthInfo],
  controllers: [TrainController],
  providers: [TrainService, AuthInfo]
})
export class TrainModule {}
