import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectStatus, ProjectStatusKeys } from 'types';

@ApiTags('Справочник')
@Controller('reference')
export class ReferenceController {
  // ======== getEnums ==========
  @ApiParam({
    name: 'name',
    description: 'имя перечисления',
    schema: {
      type: 'string',
      enum: ['ProjectStatus', 'UserDecision'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Объект перечисления или undefined',
    type: Object,
  })
  @Get('enums/:name')
  async getEnums(@Param('name') name: string) {
    const out: Partial<Record<ProjectStatusKeys, ProjectStatus>> = {
      APPROVED: ProjectStatus.APPROVED,
      NOT_APPROVED: ProjectStatus.NOT_APPROVED,
    };
    if (name === 'ProjectStatus') {
      out.FREEZED = ProjectStatus.FREEZED;
      out.IN_PROGRESS = ProjectStatus.IN_PROGRESS;
    }
    return out;
  }
}
