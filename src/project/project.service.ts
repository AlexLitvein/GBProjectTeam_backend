import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateProjectDto, UpdateProjectDto } from 'project/dto';
import { StorageService } from 'storage/storage.service';
import { Project, ProjectDocument, projectProxy } from './project.shema';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name, 'nest') private projectModel: Model<ProjectDocument>,
    private storage: StorageService,
  ) { }

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
      });
  }

  async create(createProjectDto: CreateProjectDto) {
    const project = new this.projectModel(createProjectDto);
    return await project.save();
  }

  async findAll() {
    return this._find({});
  }

  findOne(id: ObjectId) {
    return this._find({ _id: id });
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

  async upload(files: Array<Express.Multer.File>) {
    const maxSize = 2 ** 16;
    const errors: string[] = [];

    files.forEach((el) => {
      if (el.size > maxSize) {
        errors.push(
          `Размер файла ${el.originalname} больше допустимого (${maxSize / 1024
          } КБ)`,
        );
      }

      if (!/(pdf|doc|jpg|png)/.test(el.mimetype)) {
        errors.push(
          `Недопустимый тип файла ${el.originalname}, требуется (pdf,doc,jpg,png)`,
        );
      }
    });

    if (errors.length) throw new BadRequestException(errors);

    return this.storage.upload(files);
  }

  // async getFilesList() {
  //   const data = await this.storage.list();
  //   return data.map((el) => ({ name: el.Key, size: el.Size }));
  // }

  // async getFileOne(fileNames: string[]) {
  //   fileNames.forEach((el) => {});
  //   return null;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
