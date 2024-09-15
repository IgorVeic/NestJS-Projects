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
import { Artist } from './artist.entity';
import { ArtistCreateDto } from './dtos/artist-create.dto';
import { ArtistUpdateDto } from './dtos/artist-update.dto';
import { ArtistsService } from './artists.service';
import { ArtistQueryDto } from './dtos/artist-query.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../common/enums/role.enum';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { CurrentUser } from '../common/enums/decorators/current-user.decorator';
import { ICurrentUser } from '../types/current-user.interface';
import { TrimStringsPipe } from '../pipes/trim-strings.pipe';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard) 
@UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
)
        
@ApiTags('Artists 🎵')    
@Controller('artists')
export class ArtistsController {
    constructor(private readonly artistsService: ArtistsService) { }
    
  @Get("/")
  @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
    @ApiOperation({ summary: 'Get All Artists 🎶' })
    @ApiOkResponse({
      type: [Artist],
      description: 'All artists retrieved successfully ✅',
    })
    getAllArtists(@Query() query:ArtistQueryDto): Promise<Artist[]> {
      return this.artistsService.getAllArtists(query);
  }
  
  @Get("/:id")
  @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Get single artist 🎸' })
  @ApiOkResponse({
    type: [Artist],
    description: 'Single artist retrieved successfully ✅',
  })
  @ApiParam({
    name: "id",
    type: String,
    description: "artistId"
  })
  getSingleArtist(@Param("id") id: string) {
    return this.artistsService.getSingleArtist(id)
    }
  
  @Post('/')
  @Roles(Role.ADMIN, Role.MODERATOR)
    @ApiOperation({ summary: 'Create a new artist 🎤' })
    @ApiCreatedResponse({
      type: Artist,
      description: 'Artist created successfully ✅',
    })
  @ApiBody({ type: ArtistCreateDto })
  @UsePipes(new TrimStringsPipe())
    createArtist(@Body() body: ArtistCreateDto,  @CurrentUser() user: ICurrentUser | undefined): Promise<Artist> {
      return this.artistsService.createArtist(body, user);
    }
  
  @Put('/:id')
  @Roles(Role.ADMIN, Role.MODERATOR)
    @ApiOperation({ summary: 'Update an artist 📝' })
    @ApiOkResponse({
      type: Artist,
      description: 'Artist updated successfully ✅',
    })
    @ApiBody({ type: ArtistUpdateDto })
    @ApiParam({ name: 'id', type: 'string' })
    @UsePipes(new TrimStringsPipe())
    updateArtist(
      @Param('id') id: string,
      @Body() body: ArtistUpdateDto,
    ): Promise<Artist> {
      return this.artistsService.updateArtist(id, body);
    }
  
  @Delete('/:id')
  @Roles(Role.ADMIN)
    @ApiOperation({ summary: 'Delete an artist 🗑️' })
    @ApiResponse({
      status: 204,
      description: 'Artist deleted successfully ✅',
    })
    @ApiParam({ name: 'id', type: 'string' })
    deleteArtist(@Param('id') id: string): Promise<void> {
      return this.artistsService.deleteArtist(id);
    }
}
