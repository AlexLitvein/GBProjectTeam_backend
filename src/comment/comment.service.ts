import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCommentDto } from 'comment/dto';
import { Comment, CommentDocument, commentProxy } from './comment.shema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name, 'nest')
    private commentModel: Model<CommentDocument>,
  ) {}

  async create(userId: ObjectId, createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel(createCommentDto);
    comment.userId = userId;
    return await comment.save();
  }

  async findByProject(projectId: ObjectId) {
    return this.commentModel.find({ projectId: projectId }).populate({
      path: commentProxy.userId.toString(),
      select: ['firstName', 'lastName'],
    });
  }

  async delMany(userIds: ObjectId[]) {
    return this.commentModel.deleteMany({ userId: userIds });
  }
}
