import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    example: 'My Updated Post',
    description: 'The updated title of the post',
    required: false,
  })
  title?: string;

  @ApiProperty({
    example: 'This is the updated content of my post.',
    description: 'The updated content of the post',
    required: false,
  })
  content?: string;

  @ApiProperty({
    example: 'true',
    description: 'Whether the post is published',
    required: false,
  })
  published?: boolean;
}
