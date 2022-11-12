import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import {
  CreateProjectDto,
  ProjectDto,
  SetProjectStatusDto,
  UpdateProjectDto,
} from 'project/dto';
import { ProjectStatus } from 'types';
import { Project, ProjectDocument, projectProxy } from './project.shema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name, 'nest')
    private projectModel: Model<ProjectDocument>, // @InjectModel(Docum.name, 'nest') private documModel: Model<DocumDocument>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async _find(filter: Object) {
    // INFO: выбрать все кроме почты
    // .populate({ path: 'coordinationUsers', select: '-email' });
    return this.projectModel
      .find(filter)
      .populate({
        path: projectProxy.coordinationUsers.toString(),
        select: ['firstName', 'lastName'],
      })
      .populate({
        path: projectProxy.documentsIds.toString(),
        select: ['attachedFileName'],
      })
      .populate({
        path: projectProxy.ownerId.toString(),
        select: ['firstName', 'lastName'],
      });
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

  async addStatus(userId: ObjectId, projectStatus: SetProjectStatusDto) {
    // findOneAndUpdate({myId: 2, 'arr.name': 'pete'}, {$set: {'arr.$.status': "new_pete_1" }})
    // const prj = await this.projectModel.findOneAndUpdate(
    //   {
    //     _id: projectStatus.projectId,
    //     'coordinationUsers.userId': userId,
    //   },
    //   { $set: { 'coordinationUsers.$.status': projectStatus.status } },
    //   {
    //     new: true,
    //   },
    // );

    // if (prj) {
    //   return prj;
    // } else {
    //   throw new ForbiddenException(
    //     'Вы не можете оперировать данным проектом, так как не являетесь его владельцем',
    //   );
    // }
    return this._findOneAndUpdate(
      {
        _id: projectStatus.projectId,
        'coordinationUsers.userId': userId,
      },
      { $set: { 'coordinationUsers.$.status': projectStatus.status } },
    );
  }

  async update(
    userId: ObjectId,
    projectId: ObjectId,
    updateProjectDto: UpdateProjectDto,
  ) {
    updateProjectDto.coordinationUsers.forEach((el) => {
      el.settedStatus = ProjectStatus.IN_PROGRESS;
    });

    return this._findOneAndUpdate(
      { _id: projectId, ownerId: userId },
      // updateProjectDto,
      { ...updateProjectDto, $set: { status: ProjectStatus.IN_PROGRESS } },
    );
  }

  remove(id: ObjectId) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
