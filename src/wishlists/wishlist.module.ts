import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from 'src/movies/movie.entity';
import { MovieService } from 'src/movies/movie.service';
import { WishlistController } from './wishlist.controller';
import Wishlist from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Movie])],
  controllers: [WishlistController],
  providers: [WishlistService, MovieService],
  exports: [WishlistService],
})
export class WishListModule {}
