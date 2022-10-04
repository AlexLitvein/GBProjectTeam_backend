import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { GetUser } from '@App/auth/decorator/get-user.decorator';
import { JwtGuard } from '@App/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { User } from './user.shema';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('_id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
