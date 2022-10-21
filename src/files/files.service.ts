import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Mongoose } from 'mongoose';
import { GridFSBucketReadStream } from 'mongodb';
import { FileInfoVm } from './dto/file-info-vm.dto';
import {
  createModel,
  GridFSBucket,
  ObjectId,
  createBucket,
} from 'mongoose-gridfs';

@Injectable()
export class FilesService {
  private fileModel: GridFSBucket;

  constructor(
    @InjectConnection('files') private readonly connection: Connection,
  ) {
    this.fileModel = createModel({
      modelName: 'fs',
      connection: this.connection,
    });
  }

  async readStream(id: string): Promise<GridFSBucketReadStream> {
    const result = await this.fileModel.findById(id);
    return await result.read();
  }

  async findInfo(id: string): Promise<FileInfoVm> {
    const result = await this.fileModel.findById(id);
    return {
      filename: result.filename,
      length: result.length,
      chunkSize: result.chunkSize,
      md5: result.md5,
      contentType: result.contentType,
    };
  }

  async deleteFile(_id: string): Promise<any> {
    const result = await this.fileModel.findById(_id);
    console.log('result', result);
    function deleteFileAsync() {
      return new Promise(function (resolve, reject) {
        result.unlink(function (err, data) {
          if (err) reject(err);
          else resolve(data);
        });
      });
    }
    return await deleteFileAsync();
  }
}
