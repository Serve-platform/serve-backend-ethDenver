import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { TradeRepository } from './repositories/trade.repository';
import { UserRepository } from '../user/repositories/user.repository';

@Injectable()
export class TradeService {
  constructor(private readonly tradeRepository: TradeRepository, private readonly userRepository: UserRepository) {}
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
    return {
      result: result
    };
  }
}
