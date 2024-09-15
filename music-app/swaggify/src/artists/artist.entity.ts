import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Song } from '../songs/song.entity';
import { Album } from '../albums/album.entity';
  

@Entity()
export class Artist {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        type: String,
        example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
    })
    id: string;

  @Column({
      name: "artist_name"
    })
    @ApiProperty({
        type: String,
        example: 'Eminem',
    })
    artistName: string;

  @Column()
  @ApiProperty({
    type: Number,
    example: 1,
  })
  age: number;
    
    @Column({
        length: 30,
    })
    @ApiProperty({
        type: String,
        maxLength: 30,
        example: 'Macedonia',
    })
    country: string;


@OneToMany(() => Song, (song) => song.artist)
@ApiPropertyOptional({
    type: [Song],
  })
  songs: Song[]; // this is not a column in the database, but a property that will be populated with the players data when we fetch a song

  @OneToMany(() => Album, (album) => album.artist)
  @ApiPropertyOptional({
      type: [Album],
    })
    albums: Album[];


  @Column({
    type: String,
    nullable: true,
    name: 'created_by',
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Artist created by user identified by this email',
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