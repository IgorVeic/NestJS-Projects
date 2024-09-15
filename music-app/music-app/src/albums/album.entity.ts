import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Song } from 'src/songs/song.entity';
import { Artist } from '../artists/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
  })
  id: string

  @Column({
    name: "album_name",
  })
    @ApiProperty({
        type: String,
        example: 'Thriller',
    })
    albumName: string;

  @Column({
      name: "artist_name"
    })
    @ApiProperty({
        type: String,
        example: 'Michael Jackson',
    })
    artistName: string;

  @Column()
  @ApiProperty({
    type: Number,
    example: 1,
  })
    year: number
  
    @OneToMany(() => Song, (song) => song.album)
    @ApiPropertyOptional({
        type: [Song],
      })
      songs: Song[]; 
  
 @ManyToOne(() => Artist, (artist) => artist.albums)
@JoinColumn({
    name: 'artist_id' 
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
    description: 'The ID of the artist credited for the album.',
    example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
  })
  artistId: string | null;
  

    @Column({
        type: String,
        nullable: true,
        name: 'created_by',
      })
      @ApiProperty({
        type: String,
        nullable: true,
        description: 'Album created by user identified by this email',
        example: 'user@example.com',
      })
    createdBy: string | null
    

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
    
      @DeleteDateColumn({
        name: 'deleted_at',
      })
      @ApiProperty({
        type: Date,
        nullable: true,
        example: '1878-01-01 00:00:00',
      })
      deletedAt: Date;
}