import { Controller, Get, Post, Body, Patch, Param, Delete, ForbiddenException } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/user/entities/user.entity';
import { Role } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Auth(Role.user)  // Only authenticated users with 'user' role can create posts
  async create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    const postData = { ...createPostDto, authorId: user.id }; // Automatically assign the post to the authenticated user
    return this.postService.create(postData);
  }

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'All posts retrieved' })
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get post by ID' })
  @ApiResponse({ status: 200, description: 'Post retrieved' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a post by ID' })
  @ApiResponse({ status: 200, description: 'Post updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Auth(Role.user, Role.admin)  // Both users and admins can update posts
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @GetUser() user: User) {
    // Ensure the user can only update their own post or if they're an admin
    const post = await this.postService.findOne(id);
    if (post.authorId !== user.id && user.role !== Role.admin) {
      throw new ForbiddenException('You do not have permission to update this post');
    }
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post by ID' })
  @ApiResponse({ status: 200, description: 'Post deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Auth(Role.user, Role.admin)  // Only users and admins can delete posts
  async remove(@Param('id') id: string, @GetUser() user: User) {
    const post = await this.postService.findOne(id);
    if (post.authorId !== user.id && user.role !== Role.admin) {
      throw new ForbiddenException('You do not have permission to delete this post');
    }
    return this.postService.remove(id);
  }
}
