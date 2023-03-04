import { Injectable } from '@nestjs/common';
import { User } from '../components/user/entities/user.entity';

@Injectable()
export class AuthInfo {
  userInfo: User | any;
}