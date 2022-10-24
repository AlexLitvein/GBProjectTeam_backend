import { Injectable } from '@nestjs/common';
// import { ConfigService } from '../config/config.service.ts';
import { InjectConnection } from '@nestjs/mongoose';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { Connection } from 'mongoose';

console.log('GridFsMulterConfigService: ');

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;
  //   constructor(
  //     @InjectConnection('files') private readonly connection: Connection,
  //   ) {
  //     console.log('constructor GridFsMulterConfigService: ');

  //     this.gridFsStorage = new GridFsStorage({
  //       db: this.connection,
  //     });
  //   }

  constructor() {
    console.log('constructor GridFsMulterConfigService: ');
    console.log({
      DATABASE_URL_log: process.env.DATABASE_URL + 'files',
    });

    this.gridFsStorage = new GridFsStorage({
      url: process.env.DATABASE_URL + 'files',
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      // file: (req, file) => {
      //   console.log('file from new GridFsStorage: ');

      //   return new Promise((resolve, reject) => {
      //     const filename = file.originalname.trim();
      //     const fileInfo = {
      //       filename: filename,
      //     };
      //     resolve(fileInfo);
      //   });
      // },
    });
  }

  createMulterOptions(): MulterModuleOptions {
    console.log({
      gridFsStorage_log: this.gridFsStorage,
    });

    return {
      storage: this.gridFsStorage,
    };
  }
}
