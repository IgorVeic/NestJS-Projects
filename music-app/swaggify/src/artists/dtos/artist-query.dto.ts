import { IsEnum, IsOptional, IsString } from "class-validator";
import { Genre } from "./../../common/enums/song-genre.enum";
import { ApiProperty } from "@nestjs/swagger";

export class ArtistQueryDto {
    @IsOptional()
    @IsEnum(Genre)
    @ApiProperty({
            enum: Genre
        })
    genre?: Genre


    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search artists by name"
        })    
    artistName?: string
    

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search for specific album by artist"
        })  
        albumName?: string
}