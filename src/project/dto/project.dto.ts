import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../project.shema';

export class ProjectDto extends Project {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
