import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.shema';
import { StorageService } from 'storage/storage.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Project.name, schema: ProjectSchema }],
      'nest',
    ),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, StorageService],
})
export class ProjectModule {}
