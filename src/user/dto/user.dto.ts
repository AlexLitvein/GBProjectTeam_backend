import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { User } from 'user/user.shema';

export class UserDto extends User {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
