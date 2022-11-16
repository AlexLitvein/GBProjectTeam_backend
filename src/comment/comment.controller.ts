import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, CommentDto } from 'comment/dto';
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
  // @ApiOperation({
  //   description: 'Создание комментария',
  // })
  // @ApiBody({
  //   type: CreateCommentDto,
  // })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Successfully created',
  //   type: CommentDto,
  // })
  // @Post()
  // create(@Body() createCommentDto: CreateCommentDto) {
  //   return this.commentService.create(createCommentDto);
  // }

  // ======== getByProject ==========
  @ApiOperation({
    description: 'Получить все комментарии проекта',
  })
  @ApiParam({
    name: 'id',
    description: 'id проекта',
  })
  @ApiResponse({
    status: 200,
    type: [CommentDto],
  })
  @Get(':projectId')
  getByDocument(@Param('projectId') projectId: ObjectId) {
    return this.commentService.findByProject(projectId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(+id);
  // }
}
