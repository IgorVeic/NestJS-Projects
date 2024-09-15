import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Genre } from "../common/enums/song-genre.enum";
import { Artist } from "../artists/artist.entity";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Album } from 'src/albums/album.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    description: 'The id of the song',
    example: '22964c0d-6a0a-4ca8-a52d-e9d68662e908',
  })
    id: string;
    
    @Column({
        type: String,
      length: 50,
        name: "song_name",
      })
      @ApiProperty({
        type: String,
        example: 'Mockingbird',
      })
      songName: string;

 
  @Column({
      type: "double precision"
    })
    @ApiProperty({
        type: Number,
        example: 0,
      })
    duration: number


    @Column({
        enum: Genre,
        enumName: 'genre',
      })
      @ApiProperty({
        enum: Genre,
        example: Genre.ROCK,
      })
    genre: Genre

    @Column({
        type: Date,
        name: 'release_date',
      })
      @ApiProperty({
        type: Date,
        example: '2010-01-02',
      })
    releaseDate: Date;
    
  @ManyToOne(() => Artist, (artist) => artist.songs)
  @JoinColumn({
    name: 'artist_id', // used to specify which column is used for this relation
  })
  @ApiPropertyOptional({
    type: Artist,
  })
    artist: Artist;

    @Column({
      nullable: true,
      name: 'artist_id',
    })
    @ApiProperty({
      type: String,
      nullable: true,
      description: 'The ID of the artist who performs the song.',
      example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
    })
artistId: string | null;
  
  
  @ManyToOne(() => Album, (album) => album.songs)
  @JoinColumn({
    name: "album_id",
  })
  @ApiPropertyOptional({
    type: Album,
  })
    album: Album
  
  @Column({
    nullable: true,
    name: 'album_id',
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'The ID of the album from which the song is performed.',
    example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
  })
  albumId: string | null;
  

  @Column({
    type: String,
    nullable: true,
    name: 'created_by',
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Song created by user identified by this email',
    example: 'user@example.com',
  })
  createdBy: string | null;
    

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: Date,
    example: '1878-01-01 00:00:00',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({
    type: Date,
    example: '1878-01-01 00:00:00',
  })
  updatedAt: Date;
}

    