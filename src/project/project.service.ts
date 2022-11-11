import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Docum, DocumDocument } from 'document/document.shema';
import { Model, ObjectId } from 'mongoose';
import { CreateProjectDto, ProjectDto, UpdateProjectDto } from 'project/dto';
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
        path: projectProxy.coordinationUsersIds.toString(),
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

  async create(createProjectDto: CreateProjectDto, ownerId: ObjectId) {
    const project = new this.projectModel(createProjectDto);
    project.ownerId = ownerId;
    project.status = ProjectStatus.DRAFT;
    return await project.save();
  }

  findOne(id: ObjectId) {
    return this._find({ _id: id });
  }

  // INFO: {$or:[{ownerId: ObjectId('63393710a6ca510e36fdd894')}, {coordinationUsersIds: ObjectId('63393710a6ca510e36fdd894')}]}
  findAllWhereUser(id: ObjectId) {
    return this._find({
      $or: [{ ownerId: id }, { coordinationUsersIds: id }],
    });
  }

  async findAll() {
    return this._find({});
  }

  async update(
    userId: ObjectId,
    projectId: ObjectId,
    updateProjectDto: UpdateProjectDto,
  ) {
    const prj = await this.projectModel.findOneAndUpdate(
      { _id: projectId, ownerId: userId },
      updateProjectDto,
      {
        new: true,
      },
    );

    if (prj) {
      return prj;
    } else {
      throw new ForbiddenException(
        'Вы не можете оперировать данным проектом, так как не являетесь его владельцем',
      );
    }

    // const prj = await this.projectModel.findOne({ _id: projectId });
    // if (prj) {
    //   if (JSON.stringify(userId) !== JSON.stringify(prj.ownerId)) {
    //     throw new ForbiddenException(
    //       'Вы не можете оперировать данным проектом, так как не являетесь его владельцем',
    //     );
    //   } else {
    //     return this.projectModel.findByIdAndUpdate(
    //       { _id: projectId },
    //       updateProjectDto,
    //       {
    //         new: true,
    //       },
    //     );
    //   }
    // } else return prj;
  }

  remove(id: ObjectId) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
