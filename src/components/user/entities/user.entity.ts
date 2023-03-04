import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('User')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 128 })
  @ApiProperty({ description: 'User ID', example: '' })
  @IsString()
  id: string;

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

  @Column({ type: 'varchar', length: 128, default: '' })
  @ApiProperty({ example: '' })
  @IsString()
  name: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  @ApiProperty({ example: '' })
  @IsString()
  phone: string;

  @Column({ type: 'varchar', length: 128, default: '' })
  @ApiProperty({ example: '' })
  @IsEmail()
  email: string;

  @Column({ type: 'timestamp', precision: 3, nullable: true })
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  lastLoginTime: Date;
}
