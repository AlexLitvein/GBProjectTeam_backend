import { OmitType } from '@nestjs/swagger';
import { DocumDto } from 'document/dto/document.dto';

export class CreateDocumentDto extends OmitType(DocumDto, [
  'createdAt',
  'updatedAt',
] as const) {}
