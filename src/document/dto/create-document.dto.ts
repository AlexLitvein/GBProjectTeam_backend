import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { DocumDto } from 'document/dto/document.dto';

export class CreateDocumentDto extends PickType(DocumDto, [
  'projectId',
  'attachedFileName',
] as const) {
  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File;
}
