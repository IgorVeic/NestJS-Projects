import { Genre } from './../common/enums/song-genre.enum';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { SongCreateDto } from './dtos/song-create.dto';
import { SongUpdateDto } from './dtos/song-update.dto';
import { SongQueryDto } from './dtos/song-query.dto';
import { ICurrentUser } from '../types/current-user.interface';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { PageDto } from '../pagination/page.dto';
import { PageMetaDto } from '../pagination/page-meta.dto';

@Injectable()
export class SongsService {
    constructor(
        @InjectRepository(Song) private songRepository: Repository<Song>,
    ) { }
    
  private songs:Song[] = []
  
//   async getAllSongs({ songName, genre}: SongQueryDto): Promise<Song[]> {
//     let whereQuery = {} satisfies FindOptionsWhere<Song>;

//     if (songName) {
//       whereQuery = {
//         ...whereQuery,
//         songName: ILike(`%${songName}%`),
//       }
//     }

//       if (genre) {
//         whereQuery = {
//           ...whereQuery,
//           genre,
//         };
//     }
  
    
//  return await this.songRepository.find({
//         where: whereQuery,
//         relations: ['album', "artist"],
//       });

  // }
  

  async getAllSongs(pageOptionsDto: PageOptionsDto, {genre, songName}: SongQueryDto): Promise<PageDto<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder("song");

    if (genre) {
      queryBuilder.where("song.genre = :genre", { genre })
    }

    if (songName) {
      queryBuilder.where("song.songName ILIKE  :songName", { songName: `%${songName}%` })
    }

    queryBuilder
      .orderBy("song.duration", pageOptionsDto.order)
      .leftJoinAndSelect("song.artist", "artist")
      .leftJoinAndSelect("song.album", "album")
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
    
      async getSong(id: string): Promise<Song> {
        return this.songRepository.findOneByOrFail({ id });
      }

      async createSong(
        body: SongCreateDto,
        user: ICurrentUser,
      ): Promise<Song> {
        console.log('Created by user:', user);
      
        // Validate that albumId and artistId are provided
        if (!body.albumId || !body.artistId) {
          throw new HttpException('AlbumId and artistId are required!', HttpStatus.BAD_REQUEST);
        }
      
        // Check if the song with the same name already exists
        const existingSong = await this.songRepository.findOne({ where: { songName: body.songName } });
        if (existingSong) {
          throw new HttpException('Song with the same name already exists and cannot be assigned to another album or artist! 🚫', HttpStatus.BAD_REQUEST);
        }
      
        const song = this.songRepository.create({
          ...body,
          createdBy: user.username,
        });
      
        return await this.songRepository.save(song);
      }

  async updateSong(id: string, body: SongUpdateDto): Promise<Song> {
        
    const song = await this.songRepository.findOneByOrFail({ id });
    const updatedSong = this.songRepository.merge(song, body);

    return this.songRepository.save(updatedSong);
      }
    
      async deleteSong(id: string): Promise<void> {
        const deletedSong  = await this.songRepository.delete(id);
        if (deletedSong.affected === 0) {
            throw new HttpException('Song with that ID was already deleted!', HttpStatus.NOT_FOUND);
        }
    }
}
