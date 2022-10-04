import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class EditUserDto extends PartialType(
  OmitType(UserDto, ['createdAt', 'updatedAt'] as const),
) {
  @ApiPropertyOptional()
  @IsString()
  // @IsOptional()
  firstName: string;

  @ApiPropertyOptional()
  @IsString()
  // @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @IsString()
  // @IsOptional()
  patronymicName: string;
}
