import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";


export class AlbumCreateDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    @ApiProperty({
      type: String,
      example: 'Thriller',
      description: 'Name of the album',
    })
    albumName: string

    @IsString()
    @IsNotEmpty()
    @Length(3, 30)

    @ApiProperty({
      type: String,
      example: 'Michael Jackson',
      description: 'Name of the artist',
    })
    artistName: string 


    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @ApiProperty({
      type: Number,
      example: 1982,
      description: 'Release year of the album',
    })
  year: number
  
  @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
      type: String,
      description: 'The ID of the artist who recorded the album',
      example: '22964c0d-6a0a-4ca8-a52d-e9d68662e908',
    })
    artistId?: string;
}