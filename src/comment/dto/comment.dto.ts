import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '../comment.shema';

export class CommentDto extends Comment {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
