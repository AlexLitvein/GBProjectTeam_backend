import { ApiProperty } from '@nestjs/swagger';

export class UploadFilesResultDto {
  @ApiProperty({ type: [String] })
  filePaths: string[];
}
