import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { TradeRepository } from './repositories/trade.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { TrainRepository } from '../../train/repository/TrainRepository';

@Injectable()
export class TradeService {
  constructor(private readonly tradeRepository: TradeRepository,
              private readonly userRepository: UserRepository,
              private readonly trainRepository: TrainRepository) {}
  create(createTradeDto: CreateTradeDto) {
    return 'This action adds a new trade';
  }

  findAll() {
    return `This action returns all trade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trade`;
  }

  update(id: number, updateTradeDto: UpdateTradeDto) {
    return `This action updates a #${id} trade`;
  }

  remove(id: number) {
    return `This action removes a #${id} trade`;
  }

  async findTradeByUser (uuid: string[]) {
    const result = await this.userRepository.findByIds(uuid);
    for (const user of result) {
      const seat = user.ownerSeat[0];
      user.locationinfo = '';
      if(seat == null) {
        continue;
      };
      const train = await this.trainRepository.findByIds([+(seat.train+"")]);
      // console.log(train[0]);
      const trainObj = train[0];
      user.locationinfo = trainObj.trainLine + ' ' + trainObj.doorNumber + '번 주변';
    }
    return {
      result: result
    };
  }
}
