import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { AuthDto, TokenDto } from 'auth/dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Регистрация/Авторизация')
@Controller('auth') // маршрут
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    description: 'Регистрация',
  })
  @ApiBody({
    type: AuthDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: TokenDto,
  })
  @Post('signup') // конечн точка
  signup(@Body() dto: AuthDto): Promise<TokenDto> {
    return this.authService.signup(dto);
  }

  @ApiOperation({
    description: 'Авторизация',
  })
  @ApiBody({
    type: AuthDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully access',
    type: TokenDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
