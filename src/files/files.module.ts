import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from './multer-config.service';
import { FilesService } from './files.service';
// import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
    // MulterModule.register({
    //   useClass: GridFsMulterConfigService,
    // }),
  ],
  controllers: [FilesController],
  // providers: [GridFsMulterConfigService, FilesService],
  // providers: [FilesService],
})
export class FilesModule {}
