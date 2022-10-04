import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      {
        type: 'array',
        items: {
          type: 'string',
        },
      },
    ],
  })
  message: string | string[];

  @ApiProperty({ required: false })
  error: string;
}
