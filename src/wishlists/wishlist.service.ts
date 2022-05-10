import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import MovieDto from 'src/movies/dto/movies.dto';
import { MovieService } from 'src/movies/movie.service';
import { Repository } from 'typeorm';
import WishlistDto from './dto/wishlist.dto';
import Wishlist from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    private readonly movieService: MovieService,
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(wishlistData: WishlistDto) {
    const newWishList = await this.wishlistsRepository.create(wishlistData);
    await this.wishlistsRepository.save(newWishList);
    return newWishList;
  }

  async getAllWishlists() {
    return this.wishlistsRepository.find({ relations: ['movies'] });
  }

  async getWishlistById(id: string) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (wishlist) {
      return wishlist;
    }
    throw new HttpException(
      'Wishlist with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async updateWishlist(id: string, wishlist: WishlistDto) {
    await this.wishlistsRepository.update(id, wishlist);
    const updatedWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    if (updatedWishlist) {
      return updatedWishlist;
    }
    throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
  }

  async addMovieToWishlist(id: string, movieData: MovieDto) {
    const { externalId } = movieData;
    const currentWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    if (
      !currentWishlist.movies.find((movie) => movie.externalId === externalId)
    ) {
      const newMovie = await this.movieService.create(movieData);
      const updatedWishlist = await this.wishlistsRepository.save({
        ...currentWishlist,
        movies: [...currentWishlist.movies, newMovie],
      });
      if (updatedWishlist) {
        return updatedWishlist;
      }
      throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
    } else {
      throw new HttpException(
        'This movie has already been added to wishlist',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteMovieFromWishlist(id: string, movieData: MovieDto) {
    const currentWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    const { externalId } = movieData;
    const newMoviesList = currentWishlist.movies.filter((movie) => {
      console.log(movie.externalId, externalId);
      return movie.externalId !== externalId;
    });
    console.log(newMoviesList);

    const updatedWishlist = await this.wishlistsRepository.save({
      ...currentWishlist,
      movies: [...(newMoviesList || [])],
    });
    if (updatedWishlist) {
      return updatedWishlist;
    }
    throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
  }

  async deleteWishlist(id: string) {
    const currentWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies'],
    });
    await this.wishlistsRepository.save({
      ...currentWishlist,
      movies: [],
    });
    const deleteResponse = await this.wishlistsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
    }
  }
}
