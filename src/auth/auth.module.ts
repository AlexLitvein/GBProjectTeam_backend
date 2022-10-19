import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'auth/auth.controller';
import { AuthService } from 'auth/auth.service';
import { JwtStrategy } from 'auth/strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'user/user.shema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }],
      'nest',
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
