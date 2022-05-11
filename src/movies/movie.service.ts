import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieInput } from './dto/movies.input';
import Movie from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(movieData: MovieInput) {
    const { externalId } = movieData;
    const currentMovieFromDatabase = await this.moviesRepository.findOne({
      where: { externalId },
      relations: ['wishlists'],
    });
    if (currentMovieFromDatabase) {
      return currentMovieFromDatabase;
    } else {
      const newMovie = this.moviesRepository.create(movieData);
      await this.moviesRepository.save(newMovie);
      return newMovie;
    }
  }

  async deleteMovie(id: string) {
    const deleteResponse = await this.moviesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }
}
