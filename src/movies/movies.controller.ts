import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// 엔트리 포인트 컨트롤
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies.';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return one movie with the id: ${movieId}.`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  delete(@Param('id') movieId: string) {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id')
  patchOne(@Param('id') movieId: string, @Body() updateData) {
    return {
      updateMoive: movieId,
      ...updateData,
    };
  }
}
