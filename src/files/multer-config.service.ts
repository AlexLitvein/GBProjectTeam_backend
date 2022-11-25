import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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
      fileFilter(req, file, cb) {
        if (!/(pdf|doc|jpeg|png|svf)/.test(file.mimetype)) {
          // Чтобы отклонить, прокиньте в аргументы `false` так: cb(null, false);
          cb(
            new BadRequestException(
              `Недопустимый тип файла ${file.originalname}, требуется (pdf,doc,jpg,png,svg)`,
            ),
            false,
          );
        } else {
          // Чтобы принять файл, используется как аргумент `true` таким образом:
          cb(null, true);
        }
      },
      storage: this.gridFsStorage,
    };
  }
}
