import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Movie from '../movies/movie.entity';

@Entity()
@ObjectType()
class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  public id: string;

  @Column()
  @Field()
  public name: string;

  @ManyToMany(() => Movie, (movie: Movie) => movie.wishlists)
  @Field((type) => [Movie])
  public movies: Movie[];
}

export default Wishlist;
