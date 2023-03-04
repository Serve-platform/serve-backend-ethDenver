import { EntityRepository } from 'typeorm';
import { Trade } from '../../components/trade/entities/trade.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Seat } from '../entities/seat.entity';

@EntityRepository(Trade)
export class SeatRepository extends BaseRepository<Seat> {}
