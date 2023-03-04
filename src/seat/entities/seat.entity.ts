import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from '../../core/common/entities/core.entity';
import { User } from '../../components/user/entities/user.entity';
import { Trade } from '../../components/trade/entities/trade.entity';
import { Train } from '../../train/entities/train.entity';

@Entity('Seat')
export class Seat extends CoreEntity {
  /**
   * 좌석에 대한 주인
   */
  @JoinColumn({
    name: 'owner',
  })
  @ManyToOne(() => User, (user) => user.uuid)
  ownerId: User;
  @RelationId((seat: Seat) => seat.ownerId)
  owner: User;

  /**
   * 좌석 구매 신청자
   */
  @JoinColumn({
    name: 'bookUser',
  })
  @ManyToOne(() => User, (user) => user.uuid)
  bookUserId: User;
  @RelationId((seat: Seat) => seat.bookUserId)
  bookUser: User;

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
  trainId: Train;
  @RelationId((seat: Seat) => seat.trainId)
  train: Train;
}
