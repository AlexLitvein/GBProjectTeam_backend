import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'auth/auth.module';
import { UserModule } from 'user/user.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from 'project/project.module';
import { StorageService } from 'storage/storage.service';
import { DocumentModule } from 'document/document.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.DATABASE_URL, { dbName: 'nest' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'), // '..'
    }),
    ProjectModule,
    DocumentModule,
  ],
  providers: [StorageService], //, DocumentService
})
export class AppModule {}
