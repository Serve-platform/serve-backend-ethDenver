import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Trade } from '../../trade/entities/trade.entity';

@Entity('User')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 128, comment: '회원UUID' })
  @ApiProperty({ description: 'User ID', example: '' })
  @IsString()
  uuid: string;

  @Column({ comment: '아이디', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  id: string;

  @Column({ comment: '비밀번호', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  @Column({ comment: '닉네임' })
  @ApiProperty({ example: '' })
  @IsString()
  nickName: string;

  @Column({ type: 'timestamp', precision: 3, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastLoginTime: Date;

  @Column({ comment: '스위치레벨', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  switchLevel: string;

  @Column({ comment: '이미지', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  image: string;

  @Column({ comment: '지갑아이디', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  walletId: string;

  @Column({ comment: '지갑이미지', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  walletImg: string;

  @Column({ comment: '양보전적', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  concesHist: string;

  @Column({ comment: '거래누적액', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  transAcc: string;

  @Column({ comment: '카카오ID', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  kakaoUUID: string;

  @Column({ comment: '지갑ID', nullable: true })
  @ApiProperty({ example: '' })
  @IsString()
  walletUUID: string;

  @OneToMany(() => Trade, (trade) => trade.id)
  reqUser: Array<Trade>;

  @OneToMany(() => Trade, (trade) => trade.id)
  resUser: Array<Trade>;
}
