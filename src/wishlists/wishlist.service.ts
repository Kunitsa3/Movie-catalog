import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieInput } from 'src/movies/dto/movies.input';
import { MovieService } from 'src/movies/movie.service';
import { Repository } from 'typeorm';
import { CreateWishlistInput, WishlistInput } from './dto/wishlist.input';
import Wishlist from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    private readonly movieService: MovieService,
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(wishlistData: CreateWishlistInput) {
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

  async updateWishlist(wishlist: WishlistInput) {
    const { id } = wishlist;
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

  async addMovieToWishlist(wishlistData: WishlistInput, movieData: MovieInput) {
    const { externalId: movieExternalId } = movieData;
    const { id } = wishlistData;
    const currentWishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    if (
      !currentWishlist.movies.find(
        (movie) => movie.externalId === movieExternalId,
      )
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

  async deleteMovieFromWishlist(
    wishlistData: WishlistInput,
    movieData: MovieInput,
  ) {
    const { id } = wishlistData;
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

  async deleteWishlist(wishlistData: WishlistInput) {
    const { id } = wishlistData;
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
