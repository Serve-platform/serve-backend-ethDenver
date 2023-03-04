import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { TradeRepository } from '../components/trade/repositories/trade.repository';
import { UserRepository } from '../components/user/repositories/user.repository';
import { SeatRepository } from './repository/SeatRepository';

@Injectable()
export class SeatService {
  constructor(private readonly seatRepository: SeatRepository) {}
  create(createSeatDto: CreateSeatDto) {
    return 'This action adds a new seat';
  }

  findAll() {
    return `This action returns all seat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seat`;
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return `This action updates a #${id} seat`;
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
