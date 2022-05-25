import { Args, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from 'src/movies/movie.service';
import { MovieDetails, APIMovieData, Params } from './movie.model';

@Resolver(() => APIMovieData)
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => APIMovieData)
  async popularMovies(@Args('params') params: Params) {
    const movies = await this.movieService.getPopularMovies(params);
    return movies;
  }

  @Query(() => APIMovieData)
  async upcomingMovies(@Args('params') params: Params) {
    const movies = await this.movieService.getUpcoming(params);
    return movies;
  }

  @Query(() => MovieDetails)
  async getMovieDetails(@Args('params') params: Params) {
    const movie = await this.movieService.getMovieDetails(params);
    return movie;
  }

  @Query(() => APIMovieData)
  async getMoviesByParams(@Args('params') params: Params) {
    const movies = await this.movieService.getMoviesByParams(params);
    return movies;
  }
}
