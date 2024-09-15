import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from './artists/artists.module';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
import { AlbumsModule } from './albums/albums.module';



@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true, // makes the config module accessible through the whole app
  }),
    DatabaseModule,
    ArtistsModule,
    SongsModule,
    AuthModule,
    AlbumsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
