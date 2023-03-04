import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Trade } from '../entities/trade.entity';

@EntityRepository(Trade)
export class TradeRepository extends BaseRepository<Trade> {}
