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

  async create(createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel(createCommentDto);
    return await comment.save();
  }

  async findByProject(documentId: ObjectId) {
    return this.commentModel.find({ projectId: documentId }).populate({
      path: commentProxy.user.toString(),
      select: ['firstName', 'lastName'],
    });
  }
}
