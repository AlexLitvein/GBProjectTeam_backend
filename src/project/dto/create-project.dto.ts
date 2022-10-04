import { OmitType } from '@nestjs/swagger';
import { ProjectDto } from './project.dto';

export class CreateProjectDto extends OmitType(ProjectDto, [
  'createdAt',
  'updatedAt',
] as const) {}
