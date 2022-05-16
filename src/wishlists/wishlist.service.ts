import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieInput } from 'src/movies/dto/movies.input';
import { MovieService } from 'src/movies/movie.service';
import UserDto from 'src/users/dto/users.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateWishlistInput, WishlistInput } from './dto/wishlist.input';
import Wishlist from './wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(
    private readonly movieService: MovieService,
    private readonly userService: UsersService,
    @InjectRepository(Wishlist)
    private wishlistsRepository: Repository<Wishlist>,
  ) {}

  async create(wishlistData: CreateWishlistInput, user: UserDto) {
    const newWishList = await this.wishlistsRepository.create({
      ...wishlistData,
      user,
    });
    await this.wishlistsRepository.save(newWishList);
    return newWishList;
  }

  async getAllWishlists(id: string) {
    const user = await this.userService.getById(id);
    return user.wishlists;
  }

  async getWishlistById(id: string, userId: string) {
    const wishlist = await this.wishlistsRepository.findOne({
      where: { id },
      relations: ['movies', 'user'],
    });

    if (wishlist.user.id !== userId) {
      throw new HttpException(
        'The user doesn`t have a wishlist with this id',
        HttpStatus.NOT_FOUND,
      );
    }

    if (wishlist) {
      return wishlist;
    }
    throw new HttpException(
      'Wishlist with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async updateWishlist(wishlist: WishlistInput, userId: string) {
    const { id } = wishlist;

    await this.getWishlistById(id, userId);
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

  async addMovieToWishlist(
    wishlistData: WishlistInput,
    movieData: MovieInput,
    userId: string,
  ) {
    const { externalId: movieExternalId } = movieData;
    const { id } = wishlistData;
    const currentWishlist = await this.getWishlistById(id, userId);

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
    userId: string,
  ) {
    const { id } = wishlistData;
    const currentWishlist = await this.getWishlistById(id, userId);
    const { externalId } = movieData;
    const newMoviesList = currentWishlist.movies.filter((movie) => {
      console.log(movie.externalId, externalId);
      return movie.externalId !== externalId;
    });

    const updatedWishlist = await this.wishlistsRepository.save({
      ...currentWishlist,
      movies: [...(newMoviesList || [])],
    });
    if (updatedWishlist) {
      return updatedWishlist;
    }
    throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
  }

  async deleteWishlist(wishlistData: WishlistInput, userId: string) {
    const { id } = wishlistData;
    const currentWishlist = await this.getWishlistById(id, userId);
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
