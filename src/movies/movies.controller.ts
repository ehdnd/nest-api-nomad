import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

// 엔트리 포인트 컨트롤
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies.';
  }

  @Get('/:id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}.`;
  }

  @Post()
  create() {
    return 'This will create a movie.';
  }

  @Delete('/:id')
  delete(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch('/:id')
  patchOne(@Param('id') movieId: string) {
    return `This will patch a movie with the id: ${movieId}`;
  }
}
