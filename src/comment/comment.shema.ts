import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose, { Document, ObjectId } from 'mongoose';
import { ProjectStatus, UserPopulate } from 'types';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @ApiProperty({ type: UserPopulate })
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  // documentId: ObjectId;
  projectId: ObjectId;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Prop({ required: false })
  message: string;

  @ApiProperty({ required: false, enum: ProjectStatus })
  @IsEnum(ProjectStatus)
  @Prop({ enum: ProjectStatus, default: ProjectStatus.IN_PROGRESS })
  status: ProjectStatus;

  @Prop({ select: false })
  __v: number;
}

export const commentProxy = new Proxy<Comment>({} as Comment, {
  get: (proxy, name) => name,
});

export const CommentSchema = SchemaFactory.createForClass(Comment);
