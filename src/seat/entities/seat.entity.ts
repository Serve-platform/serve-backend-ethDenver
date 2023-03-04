import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from '../../core/common/entities/core.entity';
import { User } from '../../components/user/entities/user.entity';
import { Trade } from '../../components/trade/entities/trade.entity';
import { Train } from '../../train/entities/train.entity';

@Entity('Seat')
export class Seat extends CoreEntity {
  @JoinColumn({
    name: 'uuid',
  })
  @ManyToOne(() => User, (user) => user.uuid)
  user: User;
  @RelationId((seat: Seat) => seat.user)
  private uuid: User;
  // 좌석 번호
  @Column()
  seatNumber: string;
  // 좌석상태
  @Column()
  state: number;

  @JoinColumn({
    name: 'trainId',
  })
  @ManyToOne(() => Train, (train) => train.id)
  train: Train;
  @RelationId((seat: Seat) => seat.train)
  private trainUuid: User;
}
