import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Seat } from '../entities/seat.entity';

@EntityRepository(Seat)
export class SeatRepository extends BaseRepository<Seat> {
  findByOwner(owner: string) {
    return this.createQueryBuilder('seat')
      .where('seat.ownerId = :owner', { owner })
      .getMany();
  }
}
