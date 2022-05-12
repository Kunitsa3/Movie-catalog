import { Field, ObjectType } from '@nestjs/graphql';
import User from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @ManyToOne(() => User, (user: User) => user.wishlists)
  public user: User;
}

export default Wishlist;
