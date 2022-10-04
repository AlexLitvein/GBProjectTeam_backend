import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  patronymicName: string;

  @Prop({ required: true, select: false })
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
