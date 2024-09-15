import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from "class-validator";
import { Transform } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { Genre } from "./../../common/enums/song-genre.enum";

export class SongUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @ApiPropertyOptional({
      type: String,
      description: 'The name of the song',
      example: 'Lose Yourself',
    })
    songName?: string


    @IsOptional()
    @Min(1)
    @IsNumber()
    @ApiPropertyOptional({
      type: Number,
      description: 'Duration of the song',
      example: 3.5,
    })
    duration?: number

@IsOptional()
@IsEnum(Genre)
@ApiPropertyOptional({
    enum: Genre,
    description: 'The genre of the song',
    example: Genre.ROCK,
  })
    genre?: Genre

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    type: String,
    example: '2020-01-01',
    description: 'Date of release',
  })
    releaseDate?: Date;
    
    @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
      type: String,
      description: 'The ID of the artist that its not his/her song',
      example: '22964c0d-6a0a-4ca8-a52d-e9d68662e908',
    })
  artistId?: string;
  

  @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
      type: String,
      description: 'The ID of the album from which the song is performed',
      example: '22964c0d-6a0a-4ca8-a52d-e9d68662e908',
    })
    albumId?: string;
}
