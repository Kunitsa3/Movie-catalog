import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from 'src/movies/movie.entity';
import { MovieModule } from 'src/movies/movie.module';
import { MovieService } from 'src/movies/movie.service';
import Wishlist from './wishlist.entity';
import { WishlistsResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, Movie]), MovieModule],
  providers: [WishlistService, WishlistsResolver],
  exports: [WishlistService],
})
export class WishListModule {}
