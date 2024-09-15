import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
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
  import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { CurrentUser } from '../common/enums/decorators/current-user.decorator';
import { ICurrentUser } from '../types/current-user.interface';
import { TrimStringsPipe } from '../pipes/trim-strings.pipe';
import { Album } from './album.entity';
import { AlbumQueryDto } from './dtos/album-query.dto';
import { AlbumUpdateDto } from './dtos/album-update.dto';
import { AlbumCreateDto } from './dtos/album-create.dto';
import { AlbumsService } from './albums.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard) 
@UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
)
    
@ApiTags('Albums 🎶')   
@Controller('albums')
export class AlbumsController {
    constructor(private readonly albumsService: AlbumsService) { }

    @Get('/')
    @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
    @ApiOperation({ summary: 'Get All Albums 🎶' })
    @ApiOkResponse({
      type: [Album],
      description: 'All albums retrieved successfully ✅',
    })
    getAllAlbums(@Query() query:AlbumQueryDto): Promise<Album[]> {
      return this.albumsService.getAllAlbums(query);
    }

    @Get("/:id")
    @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
    @ApiOperation({ summary: 'Get single album 🎸' })
    @ApiOkResponse({
      type: [Album],
      description: 'Single album retrieved successfully ✅',
    })
    @ApiParam({
      name: "id",
      type: String,
      description: "albumId"
    })
    getSingleAlbum(@Param("id") id: string) {
      return this.albumsService.getSingleAlbum(id)
      }
    
      @Post('/')
      @Roles(Role.ADMIN, Role.MODERATOR)
        @ApiOperation({ summary: 'Create a new album 🎤' })
        @ApiCreatedResponse({
          type: Album,
          description: 'Album created successfully ✅',
        })
      @ApiBody({ type: AlbumCreateDto })
      @UsePipes(new TrimStringsPipe())
        createAlbum(@Body() body: AlbumCreateDto,  @CurrentUser() user: ICurrentUser | undefined): Promise<Album> {
          return this.albumsService.createAlbum(body, user);
        }
      
      @Put('/:id')
      @Roles(Role.ADMIN, Role.MODERATOR)
        @ApiOperation({ summary: 'Update an album 📝' })
        @ApiOkResponse({
          type: Album,
          description: 'Album updated successfully ✅',
        })
        @ApiBody({ type: AlbumUpdateDto })
        @ApiParam({ name: 'id', type: 'string' })
        @UsePipes(new TrimStringsPipe())
        updateAlbum(
          @Param('id') id: string,
          @Body() body: AlbumUpdateDto,
        ): Promise<Album> {
          return this.albumsService.updateAlbum(id, body);
        }
      
      @Delete('/:id')
      @Roles(Role.ADMIN)
        @ApiOperation({ summary: 'Delete an album 🗑️' })
        @ApiResponse({
          status: 204,
          description: 'Album deleted successfully ✅',
        })
        @ApiParam({ name: 'id', type: 'string' })
        deleteAlbum(@Param('id') id: string): Promise<void> {
          return this.albumsService.deleteAlbum(id);
        }

}
