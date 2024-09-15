import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    Min,
  } from 'class-validator';
import { Genre } from './../../common/enums/song-genre.enum';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class SongCreateDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    @ApiProperty({
      type: String,
      description: 'The name of the song',
      example: 'Lose Yourself',
    })
    songName: string


    @Min(1)
    @IsNumber()
    @ApiProperty({
      type: Number,
      description: 'Duration of the song',
      example: 3.5,
    })
    duration: number

  @IsEnum(Genre)
  @ApiProperty({
    enum: Genre,
    description: 'The genre of the song',
    example: Genre.ROCK,
  })
    genre: Genre

  @IsDateString()
  @ApiProperty({
    type: String,
    example: '2020-01-01',
    description: 'Date of release',
  })
  releaseDate: Date;


    @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
      type: String,
      description: 'The ID of the artist who performs the song',
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





// name e.g. "Shape of You"
// duration (in seconds) e.g. 233
// genre: (e.g. "pop")
// releaseDate: (e.g. "2021-04-21")