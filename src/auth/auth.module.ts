import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@App/auth/auth.controller';
import { AuthService } from '@App/auth/auth.service';
import { JwtStrategy } from '@App/auth/strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@App/user/user.shema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
