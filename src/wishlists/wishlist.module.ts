import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Wishlist from './wishlist.entity';
import { WishlistService } from './wishlist.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist])],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishListModule {}
