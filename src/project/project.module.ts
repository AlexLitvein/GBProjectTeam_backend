import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.shema';
import { StorageService } from 'storage/storage.service';
import { Docum, DocumSchema } from 'document/document.shema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Project.name, schema: ProjectSchema }],
      'nest',
    ),
    // MongooseModule.forFeature(
    //   [{ name: Docum.name, schema: DocumSchema }],
    //   'nest',
    // ),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
