import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { first, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { MovieInput } from './dto/movies.input';
import Movie from './movie.entity';
import { APIMovieData } from './movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    private httpService: HttpService,
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

  getPopularMovies(page: number): Observable<APIMovieData[]> {
    return this.httpService
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=e9b6907feb6085e090a0e8937877039b&language=en-US&page=${page}`,
      )
      .pipe(
        map(({ data }) => data),
        first(),
      );
  }

  getUpcoming(page: number): Observable<APIMovieData[]> {
    return this.httpService
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=e9b6907feb6085e090a0e8937877039b&language=en-US&page=${page}`,
      )
      .pipe(
        map(({ data }) => data),
        first(),
      );
  }
}
