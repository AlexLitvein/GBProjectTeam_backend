import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Enums } from 'types';

@ApiTags('Справочник')
@Controller('reference')
export class ReferenceController {
  // ======== getEnums ==========
  @ApiParam({
    name: 'name',
    description: 'имя перечисления',
    schema: {
      type: 'string',
      enum: ['ProjectStatus', 'DocumentStatus'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Объект перечисления или undefined',
    type: Object,
  })
  @Get('enums/:name')
  async getEnums(@Param('name') name: string) {
    return Enums[name];
  }
}
