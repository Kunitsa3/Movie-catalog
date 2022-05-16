import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from 'src/movies/movie.entity';
import { MovieModule } from 'src/movies/movie.module';
import User from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import Wishlist from './wishlist.entity';
import { WishlistsResolver } from './wishlist.resolver';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist, Movie, User]),
    MovieModule,
    UsersModule,
  ],
  providers: [WishlistService, WishlistsResolver, UsersService],
  exports: [WishlistService],
})
export class WishListModule {}
