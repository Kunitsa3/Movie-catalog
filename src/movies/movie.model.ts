/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class APIMovieData {
  @Field((type) => Int)
  page: number;
  @Field((type) => [APIMovie])
  results: APIMovie[];
  @Field((type) => Int)
  total_pages: number;
  @Field((type) => Int)
  total_results: number;
}

@ObjectType()
export class APIMovie {
  @Field()
  public adult: string;
  @Field()
  backdrop_path: string;
  @Field((type) => [Int])
  genre_ids: number[];
  @Field((type) => Int)
  id: number;
  @Field()
  original_language: string;
  @Field()
  original_title: string;
  @Field()
  overview: string;
  @Field((type) => Float)
  popularity: number;
  @Field()
  poster_path: string;
  @Field()
  release_date: string;
  @Field()
  title: string;
  @Field()
  video: boolean;
  @Field((type) => Float)
  vote_average: number;
  @Field((type) => Int)
  vote_count: number;
}
