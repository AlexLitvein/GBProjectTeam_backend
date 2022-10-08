import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Docum, DocumDocument } from './document.shema';
import { CreateDocumentDto, UpdateDocumentDto } from './dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Docum.name) private documModel: Model<DocumDocument>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    const docum = new this.documModel(createDocumentDto);
    return await docum.save();
  }

  // async findAll() {
  //   return `This action returns all document`;
  // }

  // async findOne(id: number) {
  //   return `This action returns a #${id} document`;
  // }

  async findMany(projectId: ObjectId) {
    return this.documModel.find({ projectId: projectId });
  }

  async update(id: ObjectId, updateDocumentDto: UpdateDocumentDto) {
    return this.documModel.findByIdAndUpdate(id, updateDocumentDto, {
      new: true,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} document`;
  // }
}
