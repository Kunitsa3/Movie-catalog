// import {
//   Body,
//   Controller,
//   Post,
//   UseGuards,
//   Param,
//   Get,
//   Delete,
// } from '@nestjs/common';
// import JwtAuthenticationGuard from 'src/auth/jwt-authentication.guard';
// import MovieInput from 'src/movies/dto/movies.dto';
// import { CreateWishlistInput, WishlistInput } from './dto/wishlist.input';
// import { WishlistService } from './wishlist.service';

// @Controller('wishlist')
// export class WishlistController {
//   constructor(private readonly wishlistService: WishlistService) {}

//   @UseGuards(JwtAuthenticationGuard)
//   @Post('create')
//   async create(@Body() wishlistData: CreateWishlistInput) {
//     return this.wishlistService.create(wishlistData);
//   }

//   @UseGuards(JwtAuthenticationGuard)
//   @Post('update/:id')
//   async update(
//     @Param('id') id: string,
//     @Body() wishlistData: WishlistInput,
//   ) {
//     return this.wishlistService.updateWishlist(wishlistData);
//   }

//   @UseGuards(JwtAuthenticationGuard)
//   @Get()
//   getAllWishlists() {
//     return this.wishlistService.getAllWishlists();
//   }

//   @UseGuards(JwtAuthenticationGuard)
//   @Get(':id')
//   getWishlistById(@Param('id') id: string) {
//     return this.wishlistService.getWishlistById(id);
//   }

//   @UseGuards(JwtAuthenticationGuard)
//   @Post('addMovie/:id')
//   async addMovieToWishlist(
//     @Param('id') id: string,
//     @Body() movieData: MovieInput,
//   ) {
//     return this.wishlistService.addMovieToWishlist(id, movieData);
//   }

//   @UseGuards(JwtAuthenticationGuard)
//   @Post('deleteMovie/:id')
//   async deleteMovieFromWishlist(
//     @Param('id') id: string,
//     @Body() movieData: MovieInput,
//   ) {
//     return this.wishlistService.deleteMovieFromWishlist(id, movieData);
//   }

//   @UseGuards(JwtAuthenticationGuard)
//   @Delete('delete/:id')
//   async deleteWishlist(@Param('id') id: string) {
//     this.wishlistService.deleteWishlist(id);
//   }
// }
