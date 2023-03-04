import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../core/common/entities/core.entity';
import { Seat } from '../../seat/entities/seat.entity';

@Entity('Train')
export class Train extends CoreEntity {
  @JoinColumn({
    name: 'uuid',
  })
  @ManyToOne(() => Seat, (seat) => seat.uuid)
  seat: Seat;
  @RelationId((train: Train) => train.seat)
  uuid: Seat;
  // 탑승 지하철
  @Column()
  trainLocation: string;
  // 탑승 호선
  @Column()
  trainLine: string;
  // 탑승 지하철 번호
  @Column()
  trainUuid: string;
  // 탑승 지하철 문 번호
  @Column()
  doorNumber: string;
  @Column()
  tradeType: string;
}
