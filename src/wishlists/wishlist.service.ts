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

  async getById(id: string) {
    const wishlist = await this.wishlistsRepository.findOne({ where: { id } });
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
    });
    if (updatedWishlist) {
      return updatedWishlist;
    }
    throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
  }

  async addMovieToWishlist(id: string, movieData: MovieDto) {
    const newMovie = await this.movieService.create(movieData);
    const currentWishlist = await this.wishlistsRepository.findOne({
      where: { id },
    });
    await this.wishlistsRepository.update(id, {
      ...currentWishlist,
      movies: [...currentWishlist.movies, newMovie],
    });
    const updatedWishlist = await this.wishlistsRepository.findOne({
      where: { id },
    });
    if (updatedWishlist) {
      return updatedWishlist;
    }
    throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
  }

  async deleteWishlist(id: string) {
    const deleteResponse = await this.wishlistsRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Wishlist not found', HttpStatus.NOT_FOUND);
    }
  }
}
