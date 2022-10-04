import { User } from '@App/user/user.shema';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectDocument, projectProxy } from './project.shema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);

    try {
      return await project.save();
    } catch (error) {
      if (error.name === 'MongoServerError') {
        throw new ForbiddenException('MongoServerError');
      }
      throw error;
    }
  }

  async findAll() {
    return (
      this.projectModel
        .find()
        // INFO: выбрать все кроме почты
        //  .populate({ path: 'coordinationUsers', select: '-email' });
        .populate({
          // path: 'coordinationUsers',
          path: projectProxy.coordinationUsersIds.toString(),
          select: ['firstName', 'lastName'],
        })
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
