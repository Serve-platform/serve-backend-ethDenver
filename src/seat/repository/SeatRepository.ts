import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Seat } from '../entities/seat.entity';

@EntityRepository(Seat)
export class SeatRepository extends BaseRepository<Seat> {}
