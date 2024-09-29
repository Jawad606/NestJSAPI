import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsOptional()
    @IsBoolean()
    published?: boolean;  

    @IsString()
    authorId:string
}
