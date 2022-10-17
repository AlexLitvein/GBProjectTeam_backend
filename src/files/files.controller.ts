import { Post, Controller, UploadedFiles, Logger, UseInterceptors, UseGuards, Get, Param, Res, HttpException, HttpStatus } from "@nestjs/common";
import { ApiCreatedResponse, ApiConsumes, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiMultiFile } from './apimultifile';



import { ApiException } from './api-exception.model';

import { FilesService } from './files.service';
import { FileResponseVm } from './dto/file-response-vm.dto'



@Controller('files')
@ApiTags('Files')
export class FilesController {
    constructor(private filesService: FilesService) { }

    @Post('')
    @ApiConsumes('multipart/form-data')
    @ApiMultiFile()
    @UseInterceptors(FilesInterceptor('files'))
    upload(@UploadedFiles() files) {
        console.debug(files, 'FILE UPLOADER');
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
        });
        return response;
    }


    @Get('info/:id')
    @ApiBadRequestResponse({ type: ApiException })
    async getFileInfo(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file info', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been detected',
            file: file
        }
    }

    @Get(':id')
    @ApiBadRequestResponse({ type: ApiException })
    async getFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }

    @Get('download/:id')
    @ApiBadRequestResponse({ type: ApiException })
    async downloadFile(@Param('id') id: string, @Res() res) {
        const file = await this.filesService.findInfo(id)
        const filestream = await this.filesService.readStream(id)
        if (!filestream) {
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        res.header('Content-Disposition', 'attachment; filename=' + file.filename);
        return filestream.pipe(res)
    }

    @Get('delete/:id')
    @ApiBadRequestResponse({ type: ApiException })
    @ApiCreatedResponse({ type: FileResponseVm })
    async deleteFile(@Param('id') id: string): Promise<FileResponseVm> {
        const file = await this.filesService.findInfo(id)
        console.log('file определён')
        const filestream = await this.filesService.deleteFile(id)
        console.log('filestream определён', filestream)
        if (!filestream) {
            throw new HttpException('An error occurred during file deletion', HttpStatus.EXPECTATION_FAILED)
        }
        return {
            message: 'File has been deleted',
            file: file
        }
    }
}