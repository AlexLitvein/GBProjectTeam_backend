import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto, ProjectDto } from 'project/dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiErrorDto } from 'error/dto/apiError.dto';
import { ObjectId } from 'mongoose';
import { JwtGuard } from 'auth/guard';
import { GetUser } from 'auth/decorator';
import { User } from '../user/user.shema';

@ApiExtraModels(ProjectDto, ApiErrorDto)
@ApiTags('projects')
@ApiBearerAuth('defaultBearerAuth')
@ApiResponse({
  status: 400,
  description: 'Error description string',
  type: ApiErrorDto,
})
@UseGuards(JwtGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

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
  @Post('create')
  create(
    @GetUser('_id') userId: User,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    return this.projectService.create(createProjectDto, userId);
  }

  // ======== getOne ==========
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
  getOne(@Param('id') id: ObjectId) {
    return this.projectService.findOne(id);
  }

  // ======== getMany ==========
  @ApiOperation({
    description: 'Получить все проекты документов',
  })
  @ApiResponse({
    status: 200,
    type: [ProjectDto],
  })
  @Get()
  getMany() {
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
  @Patch('update/:id')
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
  @Delete('delete/:id')
  delete(@Param('id') id: ObjectId) {
    return this.projectService.remove(id);
  }
}
