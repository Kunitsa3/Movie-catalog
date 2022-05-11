import { Args, Query, Resolver } from '@nestjs/graphql';
import Wishlist from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Resolver(() => Wishlist)
export class WishlistsResolver {
  constructor(private wishlistService: WishlistService) {}

  @Query(() => [Wishlist])
  async wishlists() {
    const wishlists = await this.wishlistService.getAllWishlists();
    return wishlists;
  }

  @Query(() => Wishlist)
  async wishlist(@Args('id') id: string) {
    return this.wishlistService.getWishlistById(id);
  }
}
