import { Module } from '@nestjs/common';
import { UserModule } from './components/user/user.module';
import { ConfigModule } from '@nestjs/config';
import configurations from './core/config/configurations';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './core/config/typeorm.config';
import { AppController } from './components/sample/app.controller';
import { TradeModule } from './components/trade/trade.module';
import { SeatModule } from './seat/seat.module';
import { WalletAddressModule } from './wallet-address/wallet-address.module';
import { TrainModule } from './train/train.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoggingInterceptor } from './auth/login-interceptor';
import { AuthInfo } from './auth/auth-info';

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
    TradeModule,
    SeatModule,
    WalletAddressModule,
    TrainModule,
    JwtModule
  ],
  controllers: [AppController],
  providers: [LoggingInterceptor, AuthInfo],
})
export class AppModule {}
