import { Module } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddressController } from './wallet-address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeatRepository } from '../seat/repository/SeatRepository';
import { TrainRepository } from '../train/repository/TrainRepository';
import { UserRepository } from '../components/user/repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthInfo } from '../auth/auth-info';
import { WalletAddressRepository } from './repository/WalletAddressRepository';
import { UserService } from '../components/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([WalletAddressRepository, SeatRepository, TrainRepository, UserRepository]),
    JwtModule, AuthInfo],
  controllers: [WalletAddressController],
  providers: [WalletAddressService, AuthInfo, UserService]
})
export class WalletAddressModule {}
