import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { User } from 'user/user.shema';

export class UserDto extends User {
  @ApiProperty({
    type: String,
    description: 'mongo ObjectId',
    example: '63393710a6ca510e36fdd894',
  })
  _id: ObjectId;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
