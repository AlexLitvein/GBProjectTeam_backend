import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
   INFO:
 * https://docs.nestjs.com/techniques/mongodb
 * Декоратор @Schema() помечает класс как определение схемы. Он сопоставляет наш
 * Cat класс с коллекцией MongoDB с тем же именем, но с дополнительной буквой «s» в
 * конце, поэтому окончательное имя коллекции mongo будет cats.
 */

// INFO: timestamps автоматически добавляет и управляет createdAt, updatedAt
@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  // @Prop({ required: true, unique: true })
  @Prop({ unique: true })
  email: string;

  @ApiPropertyOptional()
  @Prop({ default: '' })
  firstName: string;

  @ApiPropertyOptional()
  @Prop({ default: '' })
  lastName: string;

  @ApiPropertyOptional()
  @Prop({ required: false, default: '' })
  patronymicName: string;

  @Prop({ required: true, select: false })
  hash: string;

  @Prop({ select: false })
  __v: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
