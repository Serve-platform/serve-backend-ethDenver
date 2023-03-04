import { Controller, Get, Param, Query } from "@nestjs/common";
import { UserService } from './user.service';
import { ApiParam } from "@nestjs/swagger";
import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import { UserIdInput } from "./dtos/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
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
}
