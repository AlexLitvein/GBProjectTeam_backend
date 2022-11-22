import { ApiProperty } from '@nestjs/swagger';
import { ProjectStatus } from 'types';

export class FilterProjectDto {
  @ApiProperty({ required: false })
  name?: string;
  @ApiProperty({ required: false })
  description?: string;
  @ApiProperty({ required: false })
  createdAfter?: Date;
  @ApiProperty({ required: false })
  createdBefore?: Date;
  @ApiProperty({ required: false })
  updatedAfter?: Date;
  @ApiProperty({ required: false })
  updatedBefore?: Date;
  @ApiProperty({ required: false })
  status?: ProjectStatus;
}
