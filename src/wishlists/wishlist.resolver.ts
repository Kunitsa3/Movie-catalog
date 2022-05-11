import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { MovieInput } from 'src/movies/dto/movies.input';
import { CreateWishlistInput, WishlistInput } from './dto/wishlist.input';
import Wishlist from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Resolver(() => Wishlist)
export class WishlistsResolver {
  constructor(private wishlistService: WishlistService) {}

  @Query(() => [Wishlist])
  @UseGuards(GraphqlJwtAuthGuard)
  async wishlists() {
    const wishlists = await this.wishlistService.getAllWishlists();
    return wishlists;
  }

  @Query(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async wishlist(@Args('id') id: string) {
    return this.wishlistService.getWishlistById(id);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async createWishlist(
    @Args('wishlistData') wishlistData: CreateWishlistInput,
  ) {
    return this.wishlistService.create(wishlistData);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async updateWishlist(@Args('wishlistData') wishlistData: WishlistInput) {
    return this.wishlistService.updateWishlist(wishlistData);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async addMovieToWishlist(
    @Args('wishlistData') wishlistData: WishlistInput,
    @Args('movieData') movieData: MovieInput,
  ) {
    return this.wishlistService.addMovieToWishlist(wishlistData, movieData);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async deleteMovieFromWishlist(
    @Args('wishlistData') wishlistData: WishlistInput,
    @Args('movieData') movieData: MovieInput,
  ) {
    return this.wishlistService.deleteMovieFromWishlist(
      wishlistData,
      movieData,
    );
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async deleteWishlist(@Args('wishlistData') wishlistData: WishlistInput) {
    return this.wishlistService.deleteWishlist(wishlistData);
  }
}
