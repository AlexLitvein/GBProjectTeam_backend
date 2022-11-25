import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './project.shema';
import { CommentService } from 'comment/comment.service';
import { Comment, CommentSchema } from 'comment/comment.shema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Project.name, schema: ProjectSchema }],
      'nest',
    ),
    MongooseModule.forFeature(
      [{ name: Comment.name, schema: CommentSchema }],
      'nest',
    ),
  ],
  controllers: [ProjectController],
  providers: [ProjectService], // CommentService
})
export class ProjectModule {}
