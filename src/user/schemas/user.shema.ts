import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

/**
 * https://docs.nestjs.com/techniques/mongodb
 * Декоратор @Schema() помечает класс как определение схемы. Он сопоставляет наш
 * Catкласс с коллекцией MongoDB с тем же именем, но с дополнительной буквой «s» в
 * конце, поэтому окончательное имя коллекции mongo будет cats.
 */
@Schema()
export class User {
  @Prop({ default: Date.now() })
  createdAt: string;

  @Prop({ default: Date.now() })
  updatedAt: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop({ default: '' })
  firstName: string;

  @Prop({ default: '' })
  lastName: string;

  @Prop({ default: '' })
  patronymicName: string;

  // @Prop([Bookmark]) ???
  //   bookmarks: Bookmark[]
}

export const UserSchema = SchemaFactory.createForClass(User);
