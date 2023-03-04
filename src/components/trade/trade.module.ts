import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TradeRepository } from './repositories/trade.repository';
import { AuthInfo } from '../../auth/auth-info';
import { TrainRepository } from '../../train/repository/TrainRepository';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRepository, UserRepository, TrainRepository]),
    JwtModule, AuthInfo],
  controllers: [TradeController],
  providers: [TradeService, AuthInfo],
})
export class TradeModule {}
