import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Docum, DocumSchema } from './document.shema';
import { MulterModule } from '@nestjs/platform-express';
import { GridFsMulterConfigService } from 'files/multer-config.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Docum.name, schema: DocumSchema }],
      'nest',
    ),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
    }),
  ],
  controllers: [DocumentController],
  providers: [GridFsMulterConfigService, DocumentService],
})
export class DocumentModule {}
