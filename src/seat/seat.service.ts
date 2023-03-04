import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { TradeRepository } from '../components/trade/repositories/trade.repository';
import { UserRepository } from '../components/user/repositories/user.repository';
import { SeatRepository } from './repository/SeatRepository';
import { Seat } from './entities/seat.entity';
import { TrainRepository } from '../train/repository/TrainRepository';
import { AuthInfo } from '../auth/auth-info';

@Injectable()
export class SeatService {
  constructor(private readonly seatRepository: SeatRepository,
              private readonly trainRepository: TrainRepository,
              private readonly authInfo: AuthInfo,
              private readonly userRepository: UserRepository) {}
  async create() {
    const trains = await this.trainRepository.find();
    for (const train of trains) {
      for (let i = 1; i < 28; i++) {
        let seat = new Seat();
        seat.seatNumber = "L"+i;
        seat.train = train;
        seat.state = 0;
        await this.seatRepository.insert(seat);
      }
      for (let i = 1; i < 28; i++) {
        let seat = new Seat();
        seat.seatNumber = "R"+i;
        seat.train = train;
        seat.state = 0;
        await this.seatRepository.insert(seat);
      }
    }
    return null;
  }

  async findAll() {
    const result = await this.seatRepository.find()
    return { result };
  }

  async findOne(id: number) {
    const result = await this.seatRepository.findOne(id)
    return { result };
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const uuid = this.authInfo.userInfo.uuid;
    const user = await this.userRepository.findOne(uuid);
    const seat = await this.seatRepository.findOne(id);
    seat.state = updateSeatDto.state;
    seat.user = user;
    const result = await this.seatRepository.save(seat);
    return { result };
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
