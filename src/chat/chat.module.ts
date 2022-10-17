import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentModule } from 'comment/comment.module';
import { UserSchema, User } from 'user/user.shema';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    CommentModule,
    JwtModule.register({}),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'nest',
    ),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
