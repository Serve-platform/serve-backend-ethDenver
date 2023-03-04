import { Body, Controller, Get, Param, Post, Query, Req, Res, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { UserIdInput } from './dtos/user.dto';
import { deploy } from '../../ton/deploy';
import * as QRCode from 'qrcode';
import { TrainService } from '../../train/train.service';
import { Train } from '../../train/entities/train.entity';
import { AuthInfo } from '../../auth/auth-info';
import { LoggingInterceptor } from '../../auth/login-interceptor';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly trainService: TrainService,
              private readonly authInfo: AuthInfo,) {}

  @Get()
  async getUsers(@Query('uuid') uuid: string) {
    console.log(uuid);
    if (uuid === undefined) {
      const data = await this.userService.getUsers();
      return {data};
    } else {
      const data = await this.userService.getUsersByUuid(uuid);
      for (const datum of data) {
        const seat = datum.ownerSeat[0];
        datum.locationinfo = '';
        if(seat == null) {
          continue;
        };
        const train = await this.trainService.findOne(+(seat.train+""));
        console.log(train.result[0]);
        const trainObj = train.result[0];
        datum.locationinfo = trainObj.trainLine + ' ' + trainObj.doorNumber + '번 주변';
        // trainLocation: '서울',
        //   trainLine: '구남규호선',
        //   trainUuid: '1st',
        //   doorNumber: '1',

      }
      return {data};
    }
  }

  @Get('/deploy')
  async deploy() {
    deploy();
  }

  @Get('/createQr')
  @UseInterceptors(LoggingInterceptor)
  async createQr(
    @Param() address: string,
    @Param() balance: string,
    @Res() res,
  ) {
    const nickName = this.authInfo.userInfo.nickName;
    const paramStr = JSON.stringify({
      address: address,
      balance: balance,
      nickName: nickName
    });
    console.log(paramStr);
    const result = await QRCode.toDataURL(paramStr);
    // base64ToImage(result, './', { fileName: 'test' });
    // response image to client
    // res.sendFile(join(__dirname, '../../../test.png'));
    // response result
    res.send(result);
  }

  @Get('/:userId')
  @ApiParam({ name: 'userId', type: String, description: 'user_id' })
  @ApiImplicitQuery({ name: 'name', required: false })
  async getUserById(
    @Query('name') name: string,
    @Param() { userId }: UserIdInput,
  ) {
    console.log(userId);
  }
  // 회원가입
  @Post('/signup')
  async postUserByFirebase(@Req() req, @Res() res, @Body() user) {
    return await this.userService.postUser(req, res, user);
  }

  // 로그인
  @Post('/login')
  async postLoginByFirebase(@Req() req, @Res() res, @Body() user) {
    return await this.userService.postLogin(req, res, user);
  }
}