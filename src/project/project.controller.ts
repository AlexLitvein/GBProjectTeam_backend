import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from 'project/dto';
// import { UpdateProjectDto } from './dto/update-project.dto';
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
import { ProjectDto } from './dto/project.dto';

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

  // ======== findAll ==========
  @ApiOperation({
    description: 'Получить все проекты документов',
  })
  @ApiResponse({
    status: 200,
    type: [ProjectDto],
  })
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  // ======== findOne ==========
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
  findOne(@Param('id') id: ObjectId) {
    return this.projectService.findOne(id);
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectService.remove(+id);
  // }
}
