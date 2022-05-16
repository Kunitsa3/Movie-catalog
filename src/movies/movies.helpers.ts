import { Params } from './movie.model';

const TMDB_API_URL = 'https://api.themoviedb.org';
const version = 3;
export const endpoints = {
  popular: 'movie/popular',
  upcoming: 'movie/upcoming',
  discoverMovie: 'discover/movie',
  movie: 'movie',
  genre: 'genre',
};
const baseUrl = `${TMDB_API_URL}/${version}`;
const appSettings = {
  api_key: 'e9b6907feb6085e090a0e8937877039b',
  language: 'en_US',
};

export const getUrl = (endpoint: string, params: Params = {}): string => {
  return Object.entries({ ...appSettings, ...params }).reduce(
    (url, [key, value]) => {
      if (value && typeof value === 'object') {
        Object.entries(value).reduce(
          (acc, [subKey, subValue]) => `${acc}&${key}.${subKey}=${subValue}`,
          url,
        );
      }
      return `${url}&${key}=${value}`;
    },
    `${baseUrl}/${endpoint}?`,
  );
};
