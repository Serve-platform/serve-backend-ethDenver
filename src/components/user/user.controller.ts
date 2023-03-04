import { Body, Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiParam } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { UserIdInput } from './dtos/user.dto';
import { User } from './entities/user.entity';
import { join } from 'path';
import { deploy } from '../../ton/deploy';
import * as QRCode from 'qrcode';
import * as base64ToImage from 'base64-to-image';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query('uuid') uuid: string) {
    console.log(uuid);
    if (uuid === undefined) {
      return await this.userService.getUsers();
    } else {
      return await this.userService.getUsersByUuid(uuid);
    }
  }

  @Get('/deploy')
  async deploy() {
    deploy();
  }

  @Get('/createQr')
  async createQr(
    @Param() address: string,
    @Param() balance: string,
    @Res() res,
  ) {
    const paramStr = JSON.stringify({
      address: address,
      balance: balance,
    });
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