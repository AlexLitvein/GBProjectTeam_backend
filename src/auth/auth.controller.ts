import {
  Controller,
  Post,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from '@App/auth/auth.service';
import { AuthDto } from '@App/auth/dto';
import { TokenDto } from './dto/responses.dto';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

@Controller('auth') // маршрут
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup') // конечн точка
  signup(@Body() dto: AuthDto): Promise<TokenDto> {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
