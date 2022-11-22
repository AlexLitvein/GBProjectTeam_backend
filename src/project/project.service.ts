import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommentService } from 'comment/comment.service';
import { CreateCommentDto } from 'comment/dto';
import { Model, ObjectId } from 'mongoose';
import {
  CreateProjectDto,
  FilterProjectDto,
  ProjectDto,
  SetDocumentStatusDto,
  UpdateProjectDto,
} from 'project/dto';
import { ProjectStatus, UserDecision } from 'types';
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
      status: { $ne: ProjectStatus.DRAFT },
      $or: [
        { ownerId: id },
        { [`${projectProxy.coordinationUsers}.userId`]: id },
      ],
    });
  }

  findFilter(id: ObjectId, filter: FilterProjectDto) {
    const criteria: { [k: string]: any } = {};
    criteria.$or = [
      { ownerId: id },
      { [`${projectProxy.coordinationUsers}.userId`]: id },
    ];

    if (filter.name) criteria.name = { $regex: filter.name, $options: 'i' };
    if (filter.description)
      criteria.description = { $regex: filter.description, $options: 'i' };
    if (filter.status) criteria.status = filter.status;

    if (filter.createdAfter && !filter.createdBefore)
      criteria.createdAt = { $gt: filter.createdAfter };
    if (filter.createdBefore && !filter.createdAfter)
      criteria.createdAt = { $lte: filter.createdBefore };

    if (filter.createdAfter && filter.createdBefore)
      criteria.createdAt = {
        $gt: filter.createdAfter,
        $lte: filter.createdBefore,
      };

    if (filter.updatedAfter && !filter.updatedBefore)
      criteria.updatedAt = { $gt: filter.updatedAfter };
    if (filter.updatedBefore && !filter.updatedAfter)
      criteria.updatedAt = { $lte: filter.updatedBefore };

    if (filter.updatedAfter && filter.updatedBefore)
      criteria.updatedAt = {
        $gt: filter.updatedAfter,
        $lte: filter.updatedBefore,
      };

    if (filter.deadlineAfter && !filter.deadlineBefore)
      criteria.deadline = { $gte: filter.deadlineAfter };
    if (filter.deadlineBefore && !filter.deadlineAfter)
      criteria.deadline = { $lte: filter.deadlineBefore };

    if (filter.deadlineAfter && filter.deadlineBefore)
      criteria.deadline = {
        $gte: filter.deadlineAfter,
        $lte: filter.deadlineBefore,
      };
    return this._find(criteria);
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
        (acc, el) => (acc &&= el.settedStatus === UserDecision.APPROVED),
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
    return this._findOneAndUpdate(
      { _id: projectId, ownerId: userId },
      // { ...updateProjectDto, $set: { status: ProjectStatus.IN_PROGRESS } },
      updateProjectDto,
    );
  }

  remove(id: ObjectId) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
