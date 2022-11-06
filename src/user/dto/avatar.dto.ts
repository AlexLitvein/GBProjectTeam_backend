import { ApiProperty } from '@nestjs/swagger';

export class AvatarDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
