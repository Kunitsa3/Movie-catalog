/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Float, InputType, Int, ObjectType } from '@nestjs/graphql';

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

@InputType()
export class Params {
  @Field((type) => Int, { nullable: true })
  page?: number;
  @Field((type) => Int, { nullable: true })
  id?: number;
  @Field((type) => Int, { nullable: true })
  year?: number;
  @Field((type) => [String], { nullable: true })
  genres?: string[];
  @Field((type) => [String], { nullable: true })
  withoutGenres?: string[];
  @Field({ nullable: true })
  sortBy?: string;
}

@ObjectType()
export class MovieDetails {
  @Field()
  adult: boolean;
  @Field({ nullable: true })
  backdrop_path: string;
  @Field((type) => Int)
  budget: number;
  @Field((type) => [Genre])
  genres: Genre[];
  @Field({ nullable: true })
  homepage: string;
  @Field((type) => Int)
  id: number;
  @Field()
  imdb_id: string;
  @Field({ nullable: true })
  original_language: string;
  @Field()
  original_title: string;
  @Field({ nullable: true })
  overview: string;
  @Field((type) => Int)
  popularity: number;
  @Field()
  poster_path: string;
  @Field((type) => [ProductionCompany], { nullable: true })
  production_companies: ProductionCompany[];
  @Field((type) => [ProductionCountry])
  production_countries: ProductionCountry[];
  @Field()
  release_date: string;
  @Field((type) => Int)
  revenue: number;
  @Field((type) => Int, { nullable: true })
  runtime: number;
  @Field((type) => [SpokenLanguage])
  spoken_languages: SpokenLanguage[];
  @Field()
  status: string;
  @Field({ nullable: true })
  tagline: string;
  @Field()
  title: string;
  @Field()
  video: boolean;
  @Field((type) => Int)
  vote_average: number;
  @Field((type) => Int)
  vote_count: number;
}

@ObjectType()
export class Genre {
  @Field((type) => Int)
  id: number;
  @Field()
  name: string;
}

@ObjectType()
export class ProductionCompany {
  @Field((type) => Int)
  id: number;
  @Field({ nullable: true })
  logo_path: string;
  @Field()
  name: string;
  @Field()
  origin_country: string;
}

@ObjectType()
export class ProductionCountry {
  @Field()
  iso_3166_1: string;
  @Field()
  name: string;
}

@ObjectType()
export class SpokenLanguage {
  @Field()
  english_name: string;
  @Field()
  iso_639_1: string;
  @Field()
  name: string;
}
