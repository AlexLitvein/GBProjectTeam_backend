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
  constructor(@InjectConnection('files') connection: Connection) {
    console.log('constructor GridFsMulterConfigService: ');

    this.gridFsStorage = new GridFsStorage({
      db: connection.db,
    });
  }

  // constructor() {
  //   console.log('constructor GridFsMulterConfigService: ');

  //   this.gridFsStorage = new GridFsStorage({
  //     url: 'mongodb://localhost/yourDB',
  //     file: (req, file) => {
  //       return new Promise((resolve, reject) => {
  //         const filename = file.originalname.trim();
  //         const fileInfo = {
  //           filename: filename,
  //         };
  //         resolve(fileInfo);
  //       });
  //     },
  //   });
  // }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
