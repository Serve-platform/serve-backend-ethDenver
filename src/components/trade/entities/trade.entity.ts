import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { CoreEntity } from '../../../core/common/entities/core.entity';

@Entity('Trade')
export class Trade extends CoreEntity {
  @ManyToOne(() => User, (user) => user.uuid)
  reqUser: User;

  @ManyToOne(() => User, (user) => user.uuid)
  resUser: User;
}
