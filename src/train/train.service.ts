import { Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { TrainRepository } from './repository/TrainRepository';
import { Train } from './entities/train.entity';

@Injectable()
export class TrainService {
  constructor (private readonly trainRepository: TrainRepository) {
  }
  async create(createTrainDto: CreateTrainDto) {
    let train = new Train();
    train.trainLocation = createTrainDto.trainLocation;
    train.trainLine = createTrainDto.trainLine;
    train.trainUuid = createTrainDto.trainUuid;
    train.doorNumber = createTrainDto.doorNumber;
    const result = await this.trainRepository.save(train)
    return result;
  }

  async findAll() {
    const result = await this.trainRepository.find();
    return { result };
  }

  async findOne(id: number) {
    const result = await this.trainRepository.findByIds([id]);
    return { result };
  }

  update(id: number, updateTrainDto: UpdateTrainDto) {
    return `This action updates a #${id} train`;
  }

  remove(id: number) {
    return `This action removes a #${id} train`;
  }
}
