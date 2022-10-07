import {
  Body,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetUser } from 'auth/decorator/get-user.decorator';
import { JwtGuard } from 'auth/guard';
import { ApiErrorDto } from 'error/dto/apiError.dto';
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

  // ======== editUser ==========
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
  @Patch()
  editUser(@GetUser('_id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
