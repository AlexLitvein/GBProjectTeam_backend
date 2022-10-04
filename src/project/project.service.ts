import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateProjectDto, UpdateProjectDto } from 'project/dto';
import { Project, ProjectDocument, projectProxy } from './project.shema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return await project.save();
  }

  async findAll() {
    return (
      this.projectModel
        .find()
        // INFO: выбрать все кроме почты
        // .populate({ path: 'coordinationUsers', select: '-email' });
        .populate({
          path: projectProxy.coordinationUsersIds.toString(),
          select: ['firstName', 'lastName'],
        })
    );
  }

  findOne(id: ObjectId) {
    return this.projectModel.find({ _id: id }).populate({
      path: projectProxy.coordinationUsersIds.toString(),
      select: ['firstName', 'lastName'],
    });
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

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
