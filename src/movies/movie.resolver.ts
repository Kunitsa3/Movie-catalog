import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { MovieService } from 'src/movies/movie.service';
import { APIMovie, APIMovieData, Params } from './movie.model';

@Resolver(() => APIMovieData)
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => APIMovieData)
  // @UseGuards(GraphqlJwtAuthGuard)
  async popularMovies(@Args('params') params: Params) {
    const movies = await this.movieService.getPopularMovies(params);
    return movies;
  }

  @Query(() => APIMovieData)
  // @UseGuards(GraphqlJwtAuthGuard)
  async upcomingMovies(@Args('params') params: Params) {
    const movies = await this.movieService.getUpcoming(params);
    return movies;
  }

  @Query(() => APIMovie)
  // @UseGuards(GraphqlJwtAuthGuard)
  async getMovieDetails(@Args('params') params: Params) {
    const movie = await this.movieService.getMovieDetails(params);
    return movie;
  }

  @Query(() => APIMovieData)
  // @UseGuards(GraphqlJwtAuthGuard)
  async getMoviesByParams(@Args('params') params: Params) {
    const movies = await this.movieService.getMoviesByParams(params);
    return movies;
  }
}
