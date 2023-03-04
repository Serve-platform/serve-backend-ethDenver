import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreEntity } from '../../core/common/entities/core.entity';
import { User } from '../../components/user/entities/user.entity';

@Entity('WalletAddress')
export class WalletAddress extends CoreEntity{
  @ManyToOne(() => User, (user) => user.uuid)
  user: User;
  @Column()
  address: string;
  @Column()
  isActive: boolean;
}
