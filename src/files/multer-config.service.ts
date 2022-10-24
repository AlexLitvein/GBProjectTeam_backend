import { Injectable } from '@nestjs/common';
// import { ConfigService } from '../config/config.service.ts';
import { InjectConnection } from '@nestjs/mongoose';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';
import { Connection, Mongoose } from 'mongoose';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: any;
  constructor(
    @InjectConnection('files') private readonly connection: Connection,
  ) {
    this.gridFsStorage = new GridFsStorage({
      db: this.connection,
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
