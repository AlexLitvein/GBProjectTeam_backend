import { Injectable } from '@nestjs/common';
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

  findAllWhereUser(id: ObjectId) {
    return this._find({
      $or: [{ ownerId: id }, { coordinationUsersIds: id }],
    });
    // {$or:[{ownerId: ObjectId('63393710a6ca510e36fdd894')}, {coordinationUsersIds: ObjectId('63393710a6ca510e36fdd894')}]}
  }

  async findAll() {
    return this._find({});
  }

  async update(id: ObjectId, updateProjectDto: UpdateProjectDto) {
    return await this.projectModel.findOneAndUpdate(
      { _id: id },
      updateProjectDto,
      {
        new: true,
      },
    );
  }

  remove(id: ObjectId) {
    return this.projectModel.findByIdAndDelete(id);
  }
}
