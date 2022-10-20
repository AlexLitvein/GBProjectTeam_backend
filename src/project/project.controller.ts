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
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto, ProjectDto } from 'project/dto';
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

@ApiExtraModels(ProjectDto, ApiErrorDto)
@ApiTags('projects')
@ApiResponse({
  status: 400,
  description: 'Error description string',
  type: ApiErrorDto,
})
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // INFO: Дб выше @Get(':id')
  // @Get('fileslist')
  // getFilesList() {
  //   return this.projectService.getFilesList();
  // }

  // ======== create ==========
  @ApiBody({
    description: 'Создание проекта документов',
    type: CreateProjectDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created',
    type: ProjectDto,
  })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  // ======== readOne ==========
  @ApiOperation({
    description: 'Получить проект документов по его id',
  })
  @ApiResponse({
    status: 200,
    type: ProjectDto,
  })
  @ApiParam({
    name: 'id',
    description: 'id пакета документов',
  })
  @Get(':id')
  readOne(@Param('id') id: ObjectId) {
    return this.projectService.findOne(id);
  }

  // ======== readMany ==========
  @ApiOperation({
    description: 'Получить все проекты документов',
  })
  @ApiResponse({
    status: 200,
    type: [ProjectDto],
  })
  @Get()
  readMany() {
    return this.projectService.findAll();
  }

  // ======== update ==========
  @ApiOperation({
    description: 'Обновить проект документов',
  })
  @ApiBody({
    type: UpdateProjectDto,
  })
  @ApiResponse({
    status: 200,
    type: [ProjectDto],
  })
  @ApiParam({
    name: 'id',
    description: 'id пакета документов',
  })
  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectDto);
  }

  // ======== delete ==========
  @ApiOperation({
    description: 'Удалить пакет по его id',
  })
  @ApiResponse({
    status: 200,
    type: ProjectDto,
  })
  @ApiParam({
    name: 'id',
    description: 'id пакета документов',
  })
  @Delete(':id')
  delete(@Param('id') id: ObjectId) {
    return this.projectService.remove(id);
  }
}
