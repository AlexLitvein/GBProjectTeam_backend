import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@App/auth/auth.module';
import { UserModule } from '@App/user/user.module';
import { BookmarkModule } from '@App/bookmark/bookmark.module';
import { PrismaModule } from '@App/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    BookmarkModule,
    PrismaModule,
  ],
})
export class AppModule {}
