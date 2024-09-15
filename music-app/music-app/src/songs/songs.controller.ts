import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { SongsService } from './songs.service';
import { SongUpdateDto } from './dtos/song-update.dto';
import { Song } from './song.entity';
import { SongQueryDto } from './dtos/song-query.dto';
import { SongCreateDto } from './dtos/song-create.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CurrentUser } from '../common/enums/decorators/current-user.decorator';
import { ICurrentUser } from '../types/current-user.interface';
import { RolesGuard } from '../guards/roles.guard';
import { TrimStringsPipe } from '../pipes/trim-strings.pipe';
import { PageOptionsDto } from 'src/pagination/page-options.dto';
import { PageDto } from 'src/pagination/page.dto';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
)
    
@ApiTags('Songs 🎼')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) { }
  
  @Get('/')
  @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Get all songs 🎶' })
  @ApiOkResponse({
    description: 'All songs are retrieved ✅',
    type: [Song],
  })
  getAllSongs(@Query() pageOptionsDto: PageOptionsDto, @Query() queries: SongQueryDto): Promise<PageDto<Song>> {
    return this.songsService.getAllSongs(pageOptionsDto, queries);
  }
    
  // @Get('/')
  // @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
  // @ApiOperation({ summary: 'Get all songs 🎶' })
  // @ApiOkResponse({
  //   description: 'All songs are retrieved ✅',
  //   type: [Song],
  // })
  // getAllSongs(@Query() query: SongQueryDto): Promise<Song[]> {
  //   return this.songsService.getAllSongs(query);
  // }

  @Get('/:id')
  @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Get a song 🎸' })
  @ApiOkResponse({
    description: 'Song with certain ID is retrieved ✅',
    type: Song,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Song ID',
  })
  getSong(@Param('id') id: string): Promise<Song> {
    return this.songsService.getSong(id);
  }

  @Post('/')
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Create a new song 🎤' })
  @ApiCreatedResponse({
    description: 'The song has been created successfully ✅',
    type: Song,
  })
  @ApiBody({
    type: SongCreateDto,
  })
  @UsePipes(new TrimStringsPipe())
  createSong(@Body() body: SongCreateDto, @CurrentUser() user: ICurrentUser | undefined): Promise<Song> {
    return this.songsService.createSong(body, user);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Update a song 📝' })
  @ApiResponse({
    status: 200,
    description: 'Updated song successfully ✅',
    type: Song,
  })
  @ApiBody({
    type: SongUpdateDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Song ID',
  })
  @UsePipes(new TrimStringsPipe())
  updateSong(
    @Param('id') id: string,
    @Body() body: SongUpdateDto,
  ): Promise<Song> {
    return this.songsService.updateSong(id, body);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Delete a song 🗑️',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted a song ✅',
  })
  @ApiParam({ name: 'id', type: 'string' })
  deleteSong(@Param('id') id: string): Promise<void> {
    return this.songsService.deleteSong(id);
  }
}
