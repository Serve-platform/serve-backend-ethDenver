import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreEntity } from '../../core/common/entities/core.entity';
import { User } from '../../components/user/entities/user.entity';
import { Trade } from '../../components/trade/entities/trade.entity';
import { Train } from '../../train/entities/train.entity';

@Entity('Seat')
export class Seat extends CoreEntity {
  /**
   * 혼돈
   */
  @JoinColumn({
    name: 'uuid',
  })
  @ManyToOne(() => User, (user) => user.uuid)
  user: User;
  @RelationId((seat: Seat) => seat.user)
  uuid: User;
  @Column()
  location: string;
  @Column()
  trainLocation: string;
  @Column()
  trainUuid: string;
  @Column()
  doorNumber: string;

  @OneToMany(() => Train, (train) => train.id)
  trains: Array<Train>;
}
