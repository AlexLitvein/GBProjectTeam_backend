import { ApiProperty } from '@nestjs/swagger';
import mongoose, { ObjectId } from 'mongoose';
import { ProjectStatus } from 'types';
import { Project } from '../project.shema';

export class ProjectDto extends Project {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class SetProjectStatusDto {
  @ApiProperty({ type: String })
  projectId: ObjectId;

  @ApiProperty({ type: String })
  status: ProjectStatus;

  @ApiProperty({ type: String, required: false })
  message: string;
}
