import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/common/enums/order.enum";

export class AlbumQueryDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search albums by release year"
        })
    year?: number


    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search albums by name"
        })    
    albumName?: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search albums by artist name"
        }) 
    artistName?: string

    @IsOptional()
    @IsEnum(Order)
    @ApiProperty({
        enum: Order,
        description: "Order albums by year"
    }) 
    order?: Order
}