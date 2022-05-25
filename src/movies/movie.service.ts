import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { first, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { MovieInput } from './dto/movies.input';
import Movie from './movie.entity';
import { APIMovie, APIMovieData, Params } from './movie.model';
import { endpoints, getUrl } from './movies.helpers';

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

  getPopularMovies(params: Params): Observable<APIMovieData[]> {
    return this.httpService.get(getUrl(endpoints.popular, params)).pipe(
      map(({ data }) => data),
      first(),
    );
  }

  getUpcoming(params: Params): Observable<APIMovieData[]> {
    return this.httpService.get(getUrl(endpoints.upcoming, params)).pipe(
      map(({ data }) => data),
      first(),
    );
  }

  getMovieDetails(params: Params): Observable<APIMovie> {
    return this.httpService.get(getUrl(`${endpoints.movie}/${params.id}`)).pipe(
      map(({ data }) => data),
      first(),
    );
  }

  getMoviesByParams(params: Params): Observable<APIMovie> {
    return this.httpService.get(getUrl(endpoints.discoverMovie, params)).pipe(
      map(({ data }) => data),
      first(),
    );
  }
}
