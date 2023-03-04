import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { LoggingInterceptor } from '../auth/login-interceptor';
import { AuthInfo } from '../auth/auth-info';
import { User } from '../components/user/entities/user.entity';
import { UserService } from '../components/user/user.service';

@UseInterceptors(LoggingInterceptor)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService,
              private readonly authInfo: AuthInfo,
              private readonly userService: UserService) {}

  // 위험해서 주석처리
  // @Post()
  // create() {
  //   return this.seatService.create();
  // }

  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string,
               @Body() updateSeatDto: UpdateSeatDto) {
    const uuid = this.authInfo.userInfo.uuid;
    if(updateSeatDto.state === 1) {
      console.log(uuid);
      const user = await this.userService.getUsersByUuid(uuid);
      // console.log(user)
      const seats = await this.seatService.findByOwner(user[0]);
      // console.log(seats)
      for (const seat of seats) {
        await this.seatService.update(seat.id, {
          state: 0,
        });
      }
    }
    return this.seatService.update(+id, updateSeatDto);
  }

  @Post('init')
  async init() {
    for (let i = 1; i < 70; i++) {
      console.log(i)
      var p = new UpdateSeatDto();
      p.state = 0;
      await this.seatService.initUpdate(i, p);
    }
    return 1;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}
