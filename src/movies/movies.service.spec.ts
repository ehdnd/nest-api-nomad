import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array,', () => {
      const res = service.getAll();
      expect(res).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 error', () => {
      expect(() => service.getOne(999)).toThrow(NotFoundException);
      expect(() => service.getOne(999)).toThrow('Movie with ID 999 not found.');
    });
  });

  describe('deleteOne', () => {
    it('should deletes a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDeleteAllMovies = service.getAll();

      expect(afterDeleteAllMovies.length).toEqual(allMovies.length - 1);
    });

    it('should throw 404 error', () => {
      expect(() => service.deleteOne(999)).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreateAllMoviesLengh = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreateAllMoviesLenth = service.getAll().length;

      expect(afterCreateAllMoviesLenth).toBeGreaterThan(
        beforeCreateAllMoviesLengh,
      );
    });
  });
});
