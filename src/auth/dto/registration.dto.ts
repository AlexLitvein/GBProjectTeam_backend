import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AuthDto } from './auth.dto';

export class RegistrationDto extends PickType(AuthDto, [
  'email',
  'password',
] as const) {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  patronymicName: string;
}
