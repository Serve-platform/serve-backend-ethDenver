import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { LoginType, UserParams } from './dtos/params/user.params';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUsers() {
    const users = await this.userRepo.createQueryBuilder().getMany();
    return users;
  }

  async postUser(req, res, _user: UserParams) {
    console.log(_user);
    let find = []
    if(_user.loginType === LoginType.KAKAO) {
      find = await this.userRepo.find({ kakaoUUID: _user.authUuid });
    } else if(_user.loginType === LoginType.EMAIL) {
      find = await this.userRepo.find({ walletUUID: _user.authUuid });
    }
    console.log(find);
    if (find.length > 0) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }
    const user = new User();
    if(_user.loginType === LoginType.EMAIL) {
      user.uuid = v4();
      user.walletUUID = _user.authUuid;
      user.nickName = _user.nickName;
    } else if(_user.loginType === LoginType.KAKAO) {
      user.uuid = v4();
      user.kakaoUUID = _user.authUuid;
      user.nickName = _user.nickName;
    }
    const result = await this.userRepo.save(user);
    console.log(result);
    const token = await this.createJwtToken(result);
    return res
      .status(200)
      .json({ message: '회원가입이 완료되었습니다.', token });
  }

  async postLogin(req, res, _user: UserParams) {
    console.log(_user);
    let find = [];
    if (_user.loginType === LoginType.KAKAO) {
      // lgoinByKakao
      find = await this.userRepo.find({ kakaoUUID: _user.authUuid });
    } else if(_user.loginType === LoginType.EMAIL) {
      find = await this.userRepo.find({ walletUUID: _user.authUuid });
    }
    if (find.length === 0) {
      return res.status(400).json({ message: '존재하지 않는 계정입니다.' });
    }
    console.log(find);
    const token = await this.createJwtToken(find[0]);
    return res.status(200).json({ message: '로그인 되었습니다.', token });
  }

  private async createJwtToken(user: User) {
    const payload = {
      uuid: user.uuid,
      nickName: user.nickName,
    };
    return this.jwtService.sign(payload, {
      secret: `${process.env.JWT_SECRET}`,
    });
  }

  async getUsersByUuid(uuid: string) {
    return this.userRepo.findByIds([uuid]);
  }
}
