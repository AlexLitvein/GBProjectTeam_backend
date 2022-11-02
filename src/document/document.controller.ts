import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiResponse, ApiBody, ApiParam, ApiConsumes } from '@nestjs/swagger';
import { GetUser } from 'auth/decorator';
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
  constructor(private readonly documentService: DocumentService) { }

  // ======== create ==========
  @ApiParam({
    name: 'projectId',
    description: 'id проекта документов',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody(
    // {
    //     description: 'Создание документа',
    //     type: CreateDocumentDto,
    //   }
    {
      schema: {
        type: 'object',
        properties: {
          // projectId: {
          //   type: 'string',
          // },
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: DocumDto,
  })
  @Post('create/:projectId')
  @UseInterceptors(FileInterceptor('file'))
  create(
    // @GetUser('_id') userId: ObjectId,
    // @Body() createDocumentDto: CreateDocumentDto,
    @Param('projectId', new ParseObjectIdPipe()) projectId: ObjectId,
    @UploadedFile() file,
  ) {
    // console.log('file.id:', file.id);
    // console.log('file.originalname:', file.originalname);
    const createDocumentDto = new CreateDocumentDto();
    createDocumentDto.projectId = projectId;
    createDocumentDto.attachedFileId = file.id;
    createDocumentDto.attachedFileName = file.originalname;
    return this.documentService.create(createDocumentDto);
  }

  // ======== getMany ==========
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

  // ======== update ==========
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
  @Patch('update/:id')
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

  // @Delete('delete/:id')
  // remove(@Param('id') id: string) {
  //   return this.documentService.remove(+id);
  // }
}
