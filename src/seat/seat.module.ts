import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradeRepository } from '../components/trade/repositories/trade.repository';
import { UserRepository } from '../components/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { SeatRepository } from './repository/SeatRepository';

@Module({
  imports: [TypeOrmModule.forFeature([SeatRepository]), JwtModule],
  controllers: [SeatController],
  providers: [SeatService]
})
export class SeatModule {}
