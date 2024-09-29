import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    AuthModule,
    PrismaModule,
  ],
})
export class PostModule {}
