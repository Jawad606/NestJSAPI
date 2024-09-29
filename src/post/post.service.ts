import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Assuming you're using Prisma
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto & { authorId: string }) { // Include authorId in the method signature
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        published: createPostDto.published || false,  // Default to false if not provided
        author: {
          connect: { id: createPostDto.authorId }, // Link the post with the user
        },
      },
    });
  }

  findAll() {
    return this.prisma.post.findMany({
      include: { author: true }, // Include author info when fetching posts
    });
  }

  findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true }, // Include author info
    });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        published: updatePostDto.published, // If you have this field in your UpdatePostDto
      },
    });
  }

  remove(id: string) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
