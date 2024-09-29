import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class Post {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the post',
  })
  id: string;

  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  title: string;

  @ApiProperty({
    example: 'This is the content of my first post.',
    description: 'The content of the post',
  })
  content: string;

  @ApiProperty({
    example: false,
    description: 'Whether the post is published',
  })
  published: boolean;

  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'When the post was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'When the post was last updated',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'The user who authored the post',
    type: () => User,  // Assuming you have a User entity
  })
  author: User;
}
