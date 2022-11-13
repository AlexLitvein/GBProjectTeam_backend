import { ProjectStatus } from 'types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose, { Document, ObjectId } from 'mongoose';

export class CoordinationUser {
  @ApiProperty({ type: 'string' })
  // @IsMongoId()
  userId: ObjectId;

  @ApiProperty({ enum: ProjectStatus })
  // @IsString()
  // @IsEnum(ProjectStatus)
  settedStatus: ProjectStatus;
}

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
  @ApiProperty({ required: false }) // for swagger
  @IsString() // for validators
  @Prop({ default: '' }) // for mongoose
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Prop({ default: '' })
  description: string;

  @ApiProperty({ type: String })
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  ownerId: ObjectId;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsMongoId({ each: true })
  @IsArray()
  @ArrayUnique()
  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Docum' }],
  })
  documentsIds: ObjectId[];

  // @ApiProperty({ required: false })
  // @IsOptional()
  // @IsMongoId({ each: true })
  // @IsArray()
  // @ArrayUnique()
  // @Prop({
  //   required: false,
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // })
  // coordinationUsersIds: ObjectId[];

  @ApiProperty({ required: false, type: [CoordinationUser] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Prop({
    required: false,
    type: [
      {
        _id: false,
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        settedStatus: { type: String },
      },
    ],
  })
  coordinationUsers: CoordinationUser[]; // CoordinationUser[];

  @ApiProperty({ required: false, enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  @IsOptional()
  @Prop({ default: ProjectStatus.DRAFT })
  status: ProjectStatus;

  @Prop({ select: false })
  __v: number;
}

export const projectProxy = new Proxy<Project>({} as Project, {
  get: (proxy, name) => name,
});

export const ProjectSchema = SchemaFactory.createForClass(Project);
