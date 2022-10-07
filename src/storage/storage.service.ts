import { BadRequestException, Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  PutObjectOutput,
  S3Client,
} from '@aws-sdk/client-s3';

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

  private async uploadOne(file: Express.Multer.File) {
    const uploadParams = {
      Bucket: this.buckedName,
      Key: file.originalname,
      Body: file.buffer,
    };
    // const res: PutObjectCommandOutput = await this.s3Client.send(new PutObjectCommand(uploadParams));
    // console.log({
    //   res_log: res.,
    // });
    return await this.s3Client.send(new PutObjectCommand(uploadParams));
  }

  async upload(files: Array<Express.Multer.File>) {
    const res: string[] = [];
    try {
      files.forEach((el) => {
        this.uploadOne(el);
        res.push(
          `https://storage.yandexcloud.net/${this.buckedName}/${el.originalname}`,
        );
      });
    } catch (error) {
      throw new BadRequestException('Не удалось загрузить файлы');
    }
    return res;
  }

  private async downloadOne(fileName: string) {
    const streamToString: { (stream: any): Promise<Buffer> } = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks)));
      });

    try {
      const data = await this.s3Client.send(
        new GetObjectCommand({
          Bucket: this.buckedName,
          Key: fileName,
        }),
      );
      return streamToString(data.Body);
    } catch (err) {
      throw new BadRequestException('Не удалось получить файл');
    }
  }

  async download(fileNames: string[]) {
    try {
      return null;
    } catch (err) {
      throw new BadRequestException('Не удалось получить файл');
    }
  }

  async list() {
    try {
      const data: ListObjectsCommandOutput = await this.s3Client.send(
        new ListObjectsCommand({ Bucket: this.buckedName }),
      );
      return data.Contents;
    } catch (err) {
      throw new BadRequestException('Не удалось загрузить список файлов');
    }
  }
}
