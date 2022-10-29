import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { GetUser } from 'auth/decorator';
import { JwtGuard } from 'auth/guard';
import { ApiErrorDto } from 'error/dto/apiError.dto';
import { ObjectId } from 'mongoose';
import { EditUserDto, UserDto } from 'user/dto';
import { UserService } from 'user/user.service';

@ApiTags('Пользователи')
@ApiBearerAuth('defaultBearerAuth')
@ApiResponse({
  status: 400,
  description: 'Error description string',
  type: ApiErrorDto,
})
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // ======== readOne ==========
  @ApiOperation({
    description: 'Получить пользователя по его id',
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @ApiParam({
    name: 'id',
    description: 'id пользователя',
  })
  @Get(':id')
  readOne(@Param('id') id: ObjectId) {
    return this.userService.findOne(id);
  }

  // ======== readMany ==========
  @ApiOperation({
    description: 'Получить всех пользователей',
  })
  @ApiResponse({
    status: 200,
    type: [UserDto],
  })
  @Get()
  readMany() {
    return this.userService.findAll();
  }

  // ======== update ==========
  @ApiOperation({
    description: 'Обновить данные юзера',
  })
  @ApiBody({
    type: EditUserDto,
  })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  @Patch('update')
  update(@GetUser('_id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
