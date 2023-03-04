import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { TradeRepository } from '../components/trade/repositories/trade.repository';
import { UserRepository } from '../components/user/repositories/user.repository';
import { SeatRepository } from './repository/SeatRepository';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatService {
  constructor(private readonly seatRepository: SeatRepository) {}
  async create(createSeatDto: CreateSeatDto) {
    const result = await this.seatRepository.save(createSeatDto);
    return result;
  }

  async findAll() {
    const result = await this.seatRepository.find()
    return result;
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
