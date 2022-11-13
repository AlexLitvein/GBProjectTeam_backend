import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsString } from 'class-validator';
import mongoose, { ObjectId } from 'mongoose';
import { ProjectStatus } from 'types';
import { Project } from '../project.shema';

export class ProjectDto extends Project {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class SetDocumentStatusDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  projectId: ObjectId;

  @ApiProperty({ enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @ApiProperty({ type: String, required: false })
  @IsString()
  message: string;
}
