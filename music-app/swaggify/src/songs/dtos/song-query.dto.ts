import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Genre } from './../../common/enums/song-genre.enum';
import { ApiProperty } from '@nestjs/swagger';


export class SongQueryDto {

    @IsEnum(Genre)
    @IsOptional()
    @ApiProperty({
        enum: Genre
    })
    genre?: Genre;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        description: "Song name"
    })
    songName?: string
}