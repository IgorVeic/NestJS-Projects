import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { Artist } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository, ILike } from 'typeorm';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { ICurrentUser } from '../types/current-user.interface';

@Injectable()
export class ArtistsService {
    constructor(
        @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) { }
  
  private artists: Artist[] = []
    

  async getAllArtists({ genre, artistName, albumName }: ArtistQueryDto): Promise<Artist[]> {
    let whereQuery = {} satisfies FindOptionsWhere<Artist>
if (genre) {
        whereQuery = {
          ...whereQuery,
          songs: {
            genre: genre
          }  
        }
      }
   if (artistName) {
        whereQuery = {
          ...whereQuery,
          artistName: ILike(`%${artistName}%`),
        }
    }

    if (albumName) {
      whereQuery = {
        ...whereQuery,
        albums: {
          albumName: ILike(`%${albumName}%`),
        }
      }
  }
    
    return this.artistRepository.find({
      where: whereQuery,
      relations: ["songs", "albums"]
    })
  }
        
      // if (query.genre) {
      //   this.artists  = this.artists.filter(a => a.songs.some(s => s.genre === query.genre))
      // }

      // if (query.artistName) {
      //   this.artists = this.artists.filter(a => a.artistName.toLowerCase().includes(query.artistName.toLowerCase()));
      // }
      
      //  return  this.artists 
      // return this.artistRepository.find({
      //   relations: ['songs', "albums"],
      //   where: whereQuery,
      //   });
      
      // return this.artistRepository.find({
      //   where: {
      //        ...(query?.artistName ? { artistName: ILike(`%${query.artistName}%`) } : {}),
      //        ...(query?.genre ? { genre: query.genre } : {})
      //   },
      //   relations: ["albums", "songs"]
      // });
  
  async getSingleArtist(id: string): Promise<Artist> {
    const singleArtist = await this.artistRepository.find({
      where: { id },
      relations: ['songs', "albums"]
    })
  return singleArtist[0]
  }
    
 async createArtist(
  body: ArtistCreateDto,
  user: ICurrentUser,
): Promise<Artist> {
  console.log('Created by user:', user);

  // Check if an artist with the same name already exists
  const existingArtist = await this.artistRepository.findOne({ where: { artistName: body.artistName } });
  if (existingArtist) {
    throw new HttpException('An artist with that name already exists in the database! 🚫', HttpStatus.BAD_REQUEST);
  }

  const bodyWithCreatedBy = {
    ...body,
    createdBy: user.username,
  };
  const newArtist: Artist = this.artistRepository.create(bodyWithCreatedBy);
  return this.artistRepository.save(newArtist);
}


    
      async updateArtist(id: string, body: ArtistUpdateDto): Promise<Artist> {
        const artist = await this.artistRepository.findOneByOrFail({ id });
        const updatedArtist = this.artistRepository.merge(artist, body);
        return this.artistRepository.save(updatedArtist);
      }
    
      async deleteArtist(id: string): Promise<void> {
       await this.artistRepository.softDelete(id);
      }
}
