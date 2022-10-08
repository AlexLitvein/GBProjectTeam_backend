import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Docum, DocumSchema } from './document.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Docum.name, schema: DocumSchema }]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
