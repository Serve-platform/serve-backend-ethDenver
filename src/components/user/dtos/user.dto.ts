import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Injectable } from '@nestjs/common';

export class UserIdInput {
  @ApiProperty({ example: '' })
  @IsString()
  userId: string;
}
