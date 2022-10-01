import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@App/auth/auth.module';
import { UserModule } from '@App/user/user.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    // MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    // MongooseModule.forRoot('mongodb://citizix:S3cret@194.87.94.182:27017', {
    MongooseModule.forRoot('mongodb://citizix:S3cret@mongodb:27017', {
      dbName: 'nest',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
