import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../core/common/entities/core.entity';
import { User } from '../../components/user/entities/user.entity';
import { Train } from '../../train/entities/train.entity';
import { UseInterceptors } from '@nestjs/common';
import { LoggingInterceptor } from '../../auth/login-interceptor';


@Entity('WalletAddress')
export class WalletAddress extends CoreEntity{
  @JoinColumn({
    name: 'userId',
  })
  @ManyToOne(() => User, (user) => user.walletAddresses)
  userId: User;
  @RelationId((walletAddress: WalletAddress) => walletAddress.userId)
  user: User;
  @Column()
  address: string;
  @Column()
  isActive: boolean;
}
