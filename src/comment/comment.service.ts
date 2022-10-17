import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from 'comment/dto';
import { StorageService } from 'storage/storage.service';
import { Comment, CommentDocument, commentProxy } from './comment.shema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name, 'nest')
    private commentModel: Model<CommentDocument>,
  ) {}

  // private async _find(filter: Object) {
  //   // INFO: выбрать все кроме почты
  //   // .populate({ path: 'coordinationUsers', select: '-email' });
  //   return this.projectModel
  //     .find(filter)
  //     .populate({
  //       path: commentProxy.coordinationUsersIds.toString(),
  //       select: ['firstName', 'lastName'],
  //     })
  //     .populate({
  //       path: commentProxy.documentsIds.toString(),
  //       select: ['attachedFileName'],
  //     });
  // }

  async create(createCommentDto: CreateCommentDto) {
    const comment = new this.commentModel(createCommentDto);
    return await comment.save();
  }

  async findByProject(documentId: ObjectId) {
    return this.commentModel.find({ documentId: documentId });
  }

  // findOne(id: ObjectId) {
  //   return this._find({ _id: id });
  // }
}
