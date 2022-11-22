import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from 'types';

export class FilterProjectDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  description?: string;
  @ApiProperty({ type: Date, required: false })
  @IsDateString()
  @IsOptional()
  createdAfter?: Date;
  @ApiProperty({ type: Date, required: false })
  @IsDateString()
  @IsOptional()
  createdBefore?: Date;
  @ApiProperty({ type: Date, required: false })
  @IsDateString()
  @IsOptional()
  updatedAfter?: Date;
  @ApiProperty({ type: Date, required: false })
  @IsDateString()
  @IsOptional()
  updatedBefore?: Date;
  @ApiProperty({ type: Date, required: false })
  @IsDateString()
  @IsOptional()
  deadlineAfter?: Date;
  @ApiProperty({ type: Date, required: false })
  @IsDateString()
  @IsOptional()
  deadlineBefore?: Date;
  @ApiProperty({ enum: ProjectStatus, required: false })
  @IsEnum(ProjectStatus)
  @IsOptional()
  status?: ProjectStatus;
}
