import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import mongoose, { Document, ObjectId } from 'mongoose';
import { DocumentStatus } from 'types';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @ApiProperty({ type: 'string' })
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: ObjectId;

  @ApiProperty({ type: 'string' })
  @IsMongoId()
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  documentId: ObjectId;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Prop({ required: false })
  message: string;

  @ApiProperty({ required: false, enum: DocumentStatus })
  @IsEnum(DocumentStatus)
  @Prop({ default: DocumentStatus.UNDEFINED })
  status: DocumentStatus;

  @Prop({ select: false })
  __v: number;
}

export const commentProxy = new Proxy<Comment>({} as Comment, {
  get: (proxy, name) => name,
});

export const CommentSchema = SchemaFactory.createForClass(Comment);
