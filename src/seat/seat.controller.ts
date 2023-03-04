import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { LoggingInterceptor } from '../auth/login-interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

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
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(+id, updateSeatDto);
  }

  @Post('init')
  init() {
    console.log('asdgsagdasgadsgasdg')
    for (let i = 0; i < 378; i++) {
      console.log(i)
      var p = new UpdateSeatDto();
      p.state = 0;
      this.seatService.initUpdate(i, p);
    }
    return 1;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}
