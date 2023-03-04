import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserInput extends User {}
export class UserIdInput {
  @ApiProperty({ example: '' })
  @IsString()
  userId: string;
}