import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from 'auth/auth.service';
import { AuthDto, AuthResponse, TokenDto } from 'auth/dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { RegistrationDto } from './dto/registration.dto';

@ApiTags('Регистрация/Авторизация')
// @ApiExtraModels(AuthResponse)
@Controller('auth') // маршрут
export class AuthController {
  constructor(private authService: AuthService) {}

  // ======== signup ==========
  @ApiOperation({
    description: 'Регистрация',
  })
  @ApiBody({
    type: RegistrationDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: TokenDto,
  })
  @Post('signup') // конечн точка
  signup(@Body() dto: RegistrationDto): Promise<TokenDto> {
    return this.authService.signup(dto);
  }

  // ======== signin ==========
  @ApiOperation({
    description: 'Авторизация',
  })
  @ApiBody({
    type: AuthDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully access',
    // type: TokenDto,
    type: AuthResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
