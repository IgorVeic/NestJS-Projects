import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";

export class AlbumUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    @ApiProperty({
      type: String,
      example: 'Thriller',
      description: 'Name of the album',
    })
    albumName?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    @ApiProperty({
      type: String,
      example: 'Michael Jackson',
      description: 'Name of the artist',
    })
    artistName?: string

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        type: Number,
        example: 1982,
        description: 'Release year of the album',
      })
  year?: number
  
  @IsOptional()
    @IsUUID()
    @ApiPropertyOptional({
      type: String,
      description: 'The ID of the artist who recorded the album',
      example: '22964c0d-6a0a-4ca8-a52d-e9d68662e908',
    })
    artistId?: string;
}