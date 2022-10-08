import { ApiProperty } from '@nestjs/swagger';
import { Docum } from '../document.shema';

export class DocumDto extends Docum {
  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
