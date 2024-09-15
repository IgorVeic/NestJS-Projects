import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Album } from './album.entity';
import { AlbumCreateDto } from './dtos/album-create.dto';
import { ICurrentUser } from '../types/current-user.interface';
import { AlbumUpdateDto } from './dtos/album-update.dto';
import { AlbumQueryDto } from './dtos/album-query.dto';
import { Order } from 'src/common/enums/order.enum';

@Injectable()
export class AlbumsService {
    constructor(
        @InjectRepository(Album) private albumRepository: Repository<Album>,
    ) { }
    
    private albums: Album[] = []


    async getAllAlbums(query: AlbumQueryDto): Promise<Album[]> {
      let whereQuery = {} satisfies FindOptionsWhere<Album>;
    
      // if (year) {
      //   whereQuery = {
      //     ...whereQuery,
      //     year: year,
      //   };
      // }

      // if (albumName) {
      //   whereQuery = {
      //     ...whereQuery,
      //     albumName: ILike(`%${albumName}%`),
      //   };
      // }
    
      // if (artistName){
      //   whereQuery = {
      //     ...whereQuery,
      //     artistName: ILike(`%${artistName}%`),
      //   };
      // }

      // return await this.albumRepository.find({
      //   where: whereQuery,
      //   relations: ['songs', "artist"],
      // });

      return this.albumRepository.find({
        where: {
             ...(query?.artistName ? { artistName: ILike(`%${query.artistName}%`) } : {}),
             ...(query?.albumName ? { albumName: ILike(`%${query.albumName}%`) } : {}),
             ...(query?.year ? { year: query.year } : {})
        },
        order: {
            ...(query?.order ? (query.order === Order.ASC ? { year: "ASC"}: { year: "DESC"}) : {})
        },
        relations: ["artist", "songs"]
      });
    }
  
  async getSingleAlbum(id: string): Promise<Album> {
    const singleAlbum = await this.albumRepository.find({
      where: { id },
      relations: ['songs', "artist"]
    })
      return singleAlbum[0]
  }
    
  async createAlbum(
    body: AlbumCreateDto,
    user: ICurrentUser,
  ): Promise<Album> {
    console.log('Created by user:', user);
    const allAlbums = await this.albumRepository.find({ where: { artistId: body.artistId } });

    const existingAlbum = allAlbums.some(album => album.albumName === body.albumName);

    if (existingAlbum) {
      throw new HttpException('The album has already been assigned to the artist! 🚫', HttpStatus.BAD_REQUEST)
    }
  
    const bodyWithCreatedBy = {
      ...body,
      createdBy: user.username,
    };
    const newAlbum: Album = this.albumRepository.create(bodyWithCreatedBy);
    return this.albumRepository.save(newAlbum);
  }

    
    async updateAlbum(id: string, body: AlbumUpdateDto): Promise<Album> {
        const album = await this.albumRepository.findOneByOrFail({ id });
        const updatedAlbum = this.albumRepository.merge(album, body);
        return this.albumRepository.save(updatedAlbum);
      }
    
      async deleteAlbum(id: string): Promise<void> {
        const deleteAlbum  = await this.albumRepository.delete(id);
        if (deleteAlbum.affected === 0) {
            throw new HttpException('Album with that ID was already deleted!', HttpStatus.NOT_FOUND);
        }
    }
}
