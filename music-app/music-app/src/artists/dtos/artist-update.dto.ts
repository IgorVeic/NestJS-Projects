import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator";

export class ArtistUpdateDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    @Transform(({ value }) => value.trim())
    @ApiProperty({
      type: String,
      example: 'Eminem',
      description: 'Name of the artist',
    })
    artistName?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
      type: Number,
      example: 0,
      description: 'Artist age',
    })
    age?: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({
      type: String,
      example: 'USA',
      description: 'Name of the country',
    })
    country?: string
    
}