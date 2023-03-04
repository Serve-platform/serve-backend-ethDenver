import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { TradeRepository } from '../components/trade/repositories/trade.repository';
import { UserRepository } from '../components/user/repositories/user.repository';
import { SeatRepository } from './repository/SeatRepository';
import { Seat } from './entities/seat.entity';
import { TrainRepository } from '../train/repository/TrainRepository';
import { AuthInfo } from '../auth/auth-info';
import { User } from '../components/user/entities/user.entity';

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
        seat.trainId = train;
        seat.state = 0;
        await this.seatRepository.insert(seat);
      }
      for (let i = 1; i < 28; i++) {
        let seat = new Seat();
        seat.seatNumber = "R"+i;
        seat.trainId = train;
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
    const result = await this.seatRepository.findOne(id);
    console.log(result.owner);
    if(result.owner != null) {
      const p = await this.userRepository.findByIds([result.owner]);
      const user = p[0];
      const train = await this.trainRepository.findByIds([+(result.train+"")]);
      console.log(train[0]);
      const trainObj = train[0];
      user.locationinfo = trainObj.trainLine + ' ' + trainObj.doorNumber + '번 주변';

      result.owner = user;
    }
    if(result.bookUser != null) {
      const book = await this.userRepository.findByIds([result.bookUser]);
      result.bookUser = book[0]
    }
    if(result.trainId != null) {
      const book = await this.userRepository.findByIds([result.bookUser]);
      result.bookUser = book[0]
    }
    return { result };
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const uuid = this.authInfo.userInfo.uuid;
    const user = await this.userRepository.findOne(uuid);
    const seat = await this.seatRepository.findOne(id);
    seat.state = updateSeatDto.state;
    if(updateSeatDto.state == 0) {
      seat.ownerId = null;
      seat.bookUserId = null;
    } else if(updateSeatDto.state == 1) {
      seat.ownerId = user;
    } else if(updateSeatDto.state == 2) {
      seat.bookUserId = user;
    }
    const result = await this.seatRepository.save(seat);
    return { result };
  }

  async initUpdate(id: number, updateSeatDto: UpdateSeatDto) {
    console.log(id);
    const seat = await this.seatRepository.findOne(id);
    console.log(seat);
    seat.state = updateSeatDto.state;
    if(updateSeatDto.state == 0) {
      seat.ownerId = null;
      seat.bookUserId = null;
    }
    const result = await this.seatRepository.save(seat);
    return { result };
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }

  async findByOwner (user1: User) {
    return await this.seatRepository.findByOwner(user1.uuid);
  }
}
