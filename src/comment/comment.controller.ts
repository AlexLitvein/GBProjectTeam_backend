import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto, CommentDto } from 'comment/dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorDto } from 'error/dto/apiError.dto';
import { ObjectId } from 'mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadFilesResultDto } from 'storage/dto/upload.dto';
import { type } from 'os';

@ApiExtraModels(CommentDto, ApiErrorDto)
@ApiTags('comments')
@ApiResponse({
  status: 400,
  description: 'Error description string',
  type: ApiErrorDto,
})
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // ======== create ==========
  @ApiOperation({
    description: 'Создание комментария',
  })
  @ApiBody({
    type: CreateCommentDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: CommentDto,
  })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // ======== getByProject ==========
  @ApiOperation({
    description: 'Получить все комментарии документа',
  })
  @ApiParam({
    name: 'id',
    description: 'id документа',
  })
  @ApiResponse({
    status: 200,
    type: [CommentDto],
  })
  @Get(':documentId')
  getByDocument(@Param('documentId') documentId: ObjectId) {
    return this.commentService.findByProject(documentId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(+id);
  // }
}
