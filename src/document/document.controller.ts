import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiErrorDto } from 'error/dto/apiError.dto';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'validators/mongo';
import { DocumentService } from './document.service';
import { CreateDocumentDto, DocumDto, UpdateDocumentDto } from './dto';

@ApiTags('Документ')
@ApiResponse({
  status: 400,
  description: 'Error description string',
  type: ApiErrorDto,
})
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiBody({
    description: 'Создание документа',
    type: CreateDocumentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: DocumDto,
  })
  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentService.create(createDocumentDto);
  }

  @ApiParam({
    name: 'projectId',
    description: 'id проекта документов',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully',
    type: [DocumDto],
  })
  @Get(':projectId')
  async getMany(
    @Param('projectId', new ParseObjectIdPipe()) projectId: ObjectId,
  ) {
    return this.documentService.findMany(projectId);
  }

  @ApiParam({
    name: 'id',
    description: 'id документа',
  })
  @ApiBody({
    description: 'Создание документа',
    type: UpdateDocumentDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated',
    type: DocumDto,
  })
  @Patch(':id')
  update(
    @Param('id', new ParseObjectIdPipe()) id: ObjectId,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  // @Get()
  // findAll() {
  //   return this.documentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.documentService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.documentService.remove(+id);
  // }
}
