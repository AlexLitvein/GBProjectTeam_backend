import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Project, ProjectSchema } from './project.shema';
import { ApiErrorDto } from '@App/error/dto/apiError.dto.ts';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  //   {
  //     "statusCode": 400,
  //     "message": [
  //         "All coordinationUsersIds's elements must be unique"
  //     ],
  //     "error": "Bad Request"
  // }

  @Post()
  // @ApiResponse({
  //   status: 201,
  //   description: 'Successfully created.',
  // })
  // HttpException
  @ApiCreatedResponse({
    // status: 201,
    description: 'Successfully created',
    schema: {
      oneOf: [
        { $ref: getSchemaPath(CreateProjectDto) },
        { $ref: getSchemaPath(ApiErrorDto) },
      ],
    },
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    // console.log({
    //   createProjectDto: createProjectDto,
    // });
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
