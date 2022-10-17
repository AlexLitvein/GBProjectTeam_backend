import { Injectable } from '@nestjs/common';
// import { ConfigService } from '../config/config.service.ts';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
    gridFsStorage: any;
    constructor(
        // private readonly configService: ConfigService,
    ) {
        this.gridFsStorage = new GridFsStorage({
            url: "mongodb://localhost:27017/files",
        });
    }

    createMulterOptions(): MulterModuleOptions {
        return {
            storage: this.gridFsStorage,
        };
    }
}