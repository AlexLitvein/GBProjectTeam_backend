import { DocumentStatus } from 'types';
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

export type DocumDocument = Docum & Document;

@Schema({ timestamps: true })
export class Docum {
  @ApiProperty({ type: 'string' })
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  projectId: ObjectId;

  @ApiProperty()
  @IsString()
  @Prop({ default: '' })
  attachedFileName: string;

  @ApiProperty({ type: 'string' })
  @IsMongoId()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  attachedFileId: ObjectId;

  // @ApiProperty()
  // @IsMongoId({ each: true })
  // @IsArray()
  // @ArrayUnique()
  // @IsOptional()
  // @Prop({
  //   required: true,
  //   type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // })
  // commentsIds: ObjectId[];

  @ApiProperty({ required: false, enum: DocumentStatus })
  @IsEnum(DocumentStatus)
  @IsOptional()
  @Prop({ default: DocumentStatus.UNDEFINED })
  status: DocumentStatus;

  @Prop({ select: false })
  __v: number;
}

export const documProxy = new Proxy<Docum>({} as Docum, {
  get: (proxy, name) => name,
});

export const DocumSchema = SchemaFactory.createForClass(Docum);
