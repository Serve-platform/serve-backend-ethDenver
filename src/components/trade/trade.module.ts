import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TradeRepository } from './repositories/trade.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TradeRepository, UserRepository]), JwtModule],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
