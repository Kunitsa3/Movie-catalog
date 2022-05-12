import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { MovieService } from 'src/movies/movie.service';
import { APIMovieData } from './movie.model';

@Resolver(() => APIMovieData)
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Query(() => APIMovieData)
  // @UseGuards(GraphqlJwtAuthGuard)
  async popularMovies(@Args('page', { type: () => Int }) page: number) {
    const movies = await this.movieService.getPopularMovies(page);
    return movies;
  }

  @Query(() => APIMovieData)
  // @UseGuards(GraphqlJwtAuthGuard)
  async upcomingMovies(@Args('page', { type: () => Int }) page: number) {
    const movies = await this.movieService.getUpcoming(page);
    return movies;
  }
}
