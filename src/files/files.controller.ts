import {
  Post,
  Controller,
  UploadedFiles,
  UploadedFile,
  Logger,
  UseInterceptors,
  UseGuards,
  Get,
  Param,
  Res,
  HttpException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiConsumes,
  ApiBadRequestResponse,
  ApiTags,
  ApiBody,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiMultiFile } from './apimultifile';
import { ApiException } from './api-exception.model';
import { FilesService } from './files.service';
import { FileResponseVm } from './dto/file-response-vm.dto';
import { UploadFileResponse, UploadFile } from './dto/fileUpload.dto';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('uploadOne')
  @ApiOperation({
    description: 'Загрузить файл на сервер',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    type: UploadFileResponse,
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file): UploadFileResponse {
    return {
      id: file.id,
      originalName: file.originalname,
      uploadDate: file.uploadDate,
    };
  }

  @Post('uploadMany')
  @ApiOperation({
    description: 'Загрузить файлы на сервер',
  })
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @ApiResponse({
    status: 201,
    type: [UploadFileResponse],
  })
  @UseInterceptors(FilesInterceptor('files'))
  uploadMany(@UploadedFiles() files: UploadFile[]): UploadFileResponse[] {
    return files.map((file) => ({
      id: file.id,
      originalName: file.originalName,
      uploadDate: file.uploadDate,
    }));
  }

  @Get('info/:id')
  @ApiBadRequestResponse({ type: ApiException })
  async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file info',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been detected',
      file: file,
    };
  }

  @Get(':id')
  @ApiBadRequestResponse({ type: ApiException })
  async getFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    return filestream.pipe(res);
  }

  @Get('download/:id')
  @ApiBadRequestResponse({ type: ApiException })
  async downloadFile(@Param('id') id: string, @Res() res) {
    const file = await this.filesService.findInfo(id);
    const filestream = await this.filesService.readStream(id);
    if (!filestream) {
      throw new HttpException(
        'An error occurred while retrieving file',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    res.header('Content-Type', file.contentType);
    res.header('Content-Disposition', 'attachment; filename=' + file.filename);
    return filestream.pipe(res);
  }

  @Delete('delete/:id')
  @ApiBadRequestResponse({ type: ApiException })
  @ApiCreatedResponse({ type: FileResponseVm })
  async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
    const file = await this.filesService.findInfo(id);
    console.log('file определён');
    const filestream = await this.filesService.deleteFile(id);
    console.log('filestream определён', filestream);
    if (!filestream) {
      throw new HttpException(
        'An error occurred during file deletion',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
    return {
      message: 'File has been deleted',
      file: file,
    };
  }
}
