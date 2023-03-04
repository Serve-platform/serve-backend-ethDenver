import { EntityRepository } from 'typeorm';
import { Trade } from '../../components/trade/entities/trade.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Train } from '../entities/train.entity';

@EntityRepository(Train)
export class TrainRepository extends BaseRepository<Train> {}
