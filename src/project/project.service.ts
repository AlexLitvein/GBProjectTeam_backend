import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentService } from 'comment/comment.service';
import { CreateCommentDto } from 'comment/dto';
import { Model, ObjectId } from 'mongoose';
import {
  CreateProjectDto,
  ProjectDto,
  SetDocumentStatusDto,
  UpdateProjectDto,
} from 'project/dto';
import { ProjectStatus } from 'types';
import { Project, ProjectDocument, projectProxy } from './project.shema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name, 'nest')
    private projectModel: Model<ProjectDocument>, // @InjectModel(Docum.name, 'nest') private documModel: Model<DocumDocument>,
    private commentService: CommentService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async _find(filter: Object) {
    // INFO: выбрать все кроме почты
    // .populate({ path: 'coordinationUsers', select: '-email' });
    return (
      this.projectModel
        .find(filter)
        // .populate({
        //   path: `${projectProxy.coordinationUsers.toString()}.userId`,
        //   select: ['firstName', 'lastName'],
        // })
        .populate({
          path: projectProxy.documentsIds.toString(),
          select: ['attachedFileName'],
        })
        .populate({
          path: projectProxy.ownerId.toString(),
          select: ['firstName', 'lastName'],
        })
    );
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async _findOneAndUpdate(filter: Object, update: Object) {
    const prj = await this.projectModel.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (prj) {
      return prj;
    } else {
      throw new ForbiddenException(
        'Вы не можете оперировать данным проектом, так как не являетесь его владельцем',
      );
    }
  }

  async create(createProjectDto: CreateProjectDto, ownerId: ObjectId) {
    const project = new this.projectModel(createProjectDto);
    project.ownerId = ownerId;
    // project.status = ProjectStatus.DRAFT; // выставляется по умолчанию в project.shema
    return await project.save();
  }

  findOne(id: ObjectId) {
    return this._find({ _id: id });
  }

  // INFO: {$or:[{ownerId: ObjectId('63393710a6ca510e36fdd894')}, {coordinationUsersIds: ObjectId('63393710a6ca510e36fdd894')}]}
  findAllWhereUser(id: ObjectId) {
    return this._find({
      // $or: [{ ownerId: id }, { coordinationUsersIds: id }],
      $or: [
        { ownerId: id },
        { [`${projectProxy.coordinationUsers}.userId`]: id },
      ],
    });
  }

  async findAll() {
    return this._find({});
  }

  async addStatus(userId: ObjectId, documentStatus: SetDocumentStatusDto) {
    const prj = await this._findOneAndUpdate(
      {
        _id: documentStatus.projectId,
        'coordinationUsers.userId': userId,
      },
      { $set: { 'coordinationUsers.$.settedStatus': documentStatus.status } },
    );

    if (prj) {
      const comment: CreateCommentDto = {
        user: userId,
        projectId: documentStatus.projectId,
        message: documentStatus.message,
        status: documentStatus.status,
      };
      this.commentService.create(comment);

      const status = prj.coordinationUsers.reduce(
        (acc, el) => (acc &&= el.settedStatus === ProjectStatus.APPROVED),
        true,
      );
      return status && prj.set('status', ProjectStatus.APPROVED);
    }

    return prj;
  }

  async update(
    userId: ObjectId,
    projectId: ObjectId,
    updateProjectDto: UpdateProjectDto,
  ) {
    // updateProjectDto.coordinationUsers.forEach((el) => {
    //   el.settedStatus = ProjectStatus.IN_PROGRESS;
    // });

    return this._findOneAndUpdate(
      { _id: projectId, ownerId: userId },
      { ...updateProjectDto, $set: { status: ProjectStatus.IN_PROGRESS } },
    );
  }

  remove(id: ObjectId) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
