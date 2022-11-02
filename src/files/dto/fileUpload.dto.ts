import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UploadFileResponse {
  @ApiProperty({
    type: String,
    description: 'mongo ObjectId',
    example: '63512bbc06f4c9ffcd5ac467',
  })
  id: ObjectId;
  @ApiProperty()
  originalName: string;
  @ApiProperty()
  uploadDate: Date;
}

export class UploadFile extends UploadFileResponse {
  fieldname: string;
  encoding: string;
  mimetype: string;
  filename: string;
  metadata: unknown;
  bucketName: string;
  chunkSize: number;
  size: number;
  md5: string;
  contentType: string;
}
