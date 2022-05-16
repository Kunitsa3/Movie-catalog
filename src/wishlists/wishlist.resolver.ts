import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import RequestWithUser from 'src/auth/auth.interface';
import { GraphqlJwtAuthGuard } from 'src/auth/graphql-jwt-auth.guard';
import { MovieInput } from 'src/movies/dto/movies.input';
import { MovieService } from 'src/movies/movie.service';
import { CreateWishlistInput, WishlistInput } from './dto/wishlist.input';
import Wishlist from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Resolver(() => Wishlist)
export class WishlistsResolver {
  constructor(
    private wishlistService: WishlistService,
    private movieService: MovieService,
  ) {}

  @Query(() => [Wishlist])
  @UseGuards(GraphqlJwtAuthGuard)
  async wishlists(@Context() context: { req: RequestWithUser }) {
    const wishlists = await this.wishlistService.getAllWishlists(
      context.req.user.id,
    );
    return wishlists;
  }

  @Query(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async wishlist(
    @Args('id') id: string,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.wishlistService.getWishlistById(id, context.req.user.id);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async createWishlist(
    @Args('wishlistData') wishlistData: CreateWishlistInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.wishlistService.create(wishlistData, context.req.user);
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async updateWishlist(
    @Args('wishlistData') wishlistData: WishlistInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.wishlistService.updateWishlist(
      wishlistData,
      context.req.user.id,
    );
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async addMovieToWishlist(
    @Args('wishlistData') wishlistData: WishlistInput,
    @Args('movieData') movieData: MovieInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.wishlistService.addMovieToWishlist(
      wishlistData,
      movieData,
      context.req.user.id,
    );
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async deleteMovieFromWishlist(
    @Args('wishlistData') wishlistData: WishlistInput,
    @Args('movieData') movieData: MovieInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.wishlistService.deleteMovieFromWishlist(
      wishlistData,
      movieData,
      context.req.user.id,
    );
  }

  @Mutation(() => Wishlist)
  @UseGuards(GraphqlJwtAuthGuard)
  async deleteWishlist(
    @Args('wishlistData') wishlistData: WishlistInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.wishlistService.deleteWishlist(
      wishlistData,
      context.req.user.id,
    );
  }
}
