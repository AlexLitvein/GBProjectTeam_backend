import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class EditUserDto extends PartialType(
  OmitType(UserDto, ['email', 'createdAt', 'updatedAt'] as const),
) {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  patronymicName: string;
}
