import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  S3Client,
  _Object,
} from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';

@Injectable()
export class StorageService {
  s3Client = null;
  readonly buckedName = 'gb-project-team-cloud';

  constructor() {
    const credentials = {
      region: 'ru-central1',
      endpoint: 'https://storage.yandexcloud.net',
      credentials: {
        accessKeyId: 'YCAJEon_s2E3UQrzvt0-4dwLO',
        secretAccessKey: 'YCPRd7kCSX7f_MBGxO1EvWgE_rFF87pqhnV6DhES',
      },
    };

    this.s3Client = new S3Client(credentials);
  }

  async upload(file) {
    // files: Array<Express.Multer.File>
    console.log('upload');

    // const file = path.join(__dirname, '../..', 'src/user/user.shema.ts');
    // console.log({
    //   file_log: file,
    // });

    // INFO: чтобы нест видел внешние модули???, добавить в tsconfig.json - "esModuleInterop": true
    const fileStream = fs.createReadStream(file);

    const uploadParams = {
      Bucket: this.buckedName,
      // Add the required 'Key' parameter using the 'path' module.
      Key: path.basename(file),
      // Add the required 'Body' parameter
      Body: fileStream,
    };

    try {
      const data = await this.s3Client.send(new PutObjectCommand(uploadParams));

      console.log({
        upload_data_Success: data,
      });

      return data;
    } catch (err) {
      console.log('Error', err);
    }
  }

  async download(file) {
    console.log('download');

    const bucketParamsGet = {
      Bucket: this.buckedName,
      Key: 'test.api.json',
    };

    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
      });

    try {
      const data = await this.s3Client.send(
        new GetObjectCommand(bucketParamsGet),
      );
      // return data; // For unit tests.
      // Convert the ReadableStream to a string.
      const bodyContents = await streamToString(data.Body);
      console.log(bodyContents);
      return bodyContents;
    } catch (err) {
      console.log('Error', err);
    }
  }

  async list() {
    try {
      const data: ListObjectsCommandOutput = await this.s3Client.send(
        new ListObjectsCommand({ Bucket: this.buckedName }),
      );
      return data.Contents;
    } catch (err) {
      console.log('Error', err);
    }
  }
}
