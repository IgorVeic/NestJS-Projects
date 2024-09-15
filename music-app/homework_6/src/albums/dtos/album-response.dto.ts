import { AlbumCreateDto } from "./album-create.dto";

export class AlbumResponseDto extends AlbumCreateDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    }