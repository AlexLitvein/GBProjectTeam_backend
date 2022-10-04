import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  error: string;
}
