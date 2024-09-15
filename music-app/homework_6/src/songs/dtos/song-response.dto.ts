import { SongCreateDto } from "./song-create.dto";

export class SongResponseDto extends SongCreateDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}