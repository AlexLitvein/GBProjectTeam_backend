import { Injectable } from '@nestjs/common';
// import { ConfigService } from '../config/config.service.ts';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

console.log('GridFsMulterConfigService: ');

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;
  constructor() {
    console.log({
      process_env: process.env,
    });

    // private readonly configService: ConfigService,
    this.gridFsStorage = new GridFsStorage({
      // url: process.env.DATABASE_FILES_URL + 'files',
      url: 'mongodb://mongodb:27017/' + 'files',
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
