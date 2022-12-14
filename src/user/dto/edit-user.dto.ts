import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { UserDto } from './user.dto';

export class EditUserDto extends PartialType(
  OmitType(UserDto, ['_id', 'createdAt', 'updatedAt'] as const),
) {
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  patronymicName: string;
}
