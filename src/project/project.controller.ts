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
  @Post('create')
  create(
    @GetUser('_id') userId: ObjectId,
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
    description:
      'Получить все проекты документов связанные с авторизованным польователем',
  })
  @ApiResponse({
    status: 200,
    type: [ProjectDto],
  })
  @Get()
  getMany(@GetUser('_id') userId: ObjectId) {
    // return this.projectService.findAll();
    return this.projectService.findAllWhereUser(userId);
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
    @GetUser('_id') userId: ObjectId,
    @Param('id') projectId: ObjectId,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    // console.log({
    //   updateProjectDto_log: updateProjectDto,
    // });
    return this.projectService.update(userId, projectId, updateProjectDto);
  }

  // ======== setStatus ==========
  // @ApiOperation({
  //   description: 'Обновить проект документов',
  // })
  // @ApiBody({
  //   type: UpdateProjectDto,
  // })
  // @ApiResponse({
  //   status: 200,
  //   type: [ProjectDto],
  // })
  // @ApiParam({
  //   name: 'id',
  //   description: 'id пакета документов',
  // })
  // @Patch('setStatus/:id')
  // setStatus(
  //   @GetUser('_id') userId: ObjectId,
  //   @Param('id') projectId: ObjectId,
  //   @Body() updateProjectDto: UpdateProjectDto,
  // ) {
  //   return this.projectService.update(userId, projectId, updateProjectDto);
  // }

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
