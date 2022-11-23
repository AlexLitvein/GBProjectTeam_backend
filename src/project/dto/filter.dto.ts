import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayContains,
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
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
  @ApiProperty({
    type: [String],
    enum: ProjectStatus,
    required: false,
    description: 'Запрос вида filter?status=val1&status=val2',
  })
  // @ApiProperty({ type: [String], required: false })
  // @IsEnum(ProjectStatus)
  // @IsArray()
  // @ArrayMinSize(0)
  // @ArrayContains(values: ProjectStatus)
  @IsOptional()
  status?: ProjectStatus[];
}
