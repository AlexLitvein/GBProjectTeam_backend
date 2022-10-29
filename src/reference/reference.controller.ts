import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Enums } from 'types';

@ApiTags('Справочник')
@Controller('reference')
export class ReferenceController {
  // ======== getEnums ==========
  @ApiParam({
    name: 'enumName',
    description: 'имя перечисления',
  })
  @ApiResponse({
    status: 200,
    description: 'Объект перечисления или undefined',
    type: Object,
  })
  @Get('enums/:enumName')
  async getEnums(@Param('enumName') enumName: string) {
    return Enums[enumName];
  }
}
