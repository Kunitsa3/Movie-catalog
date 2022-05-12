import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from './movie.entity';
import { MovieResolver } from './movie.resolver';
import { MovieService } from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), HttpModule],
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
