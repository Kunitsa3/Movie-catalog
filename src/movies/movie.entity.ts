import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Wishlist from '../wishlists/wishlist.entity';

@Entity()
@ObjectType()
class Movie {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  public id: string;

  @Column()
  @Field()
  public externalId: string;

  @ManyToMany(() => Wishlist, (wishlist: Wishlist) => wishlist.movies)
  @JoinTable()
  @Field(() => [Wishlist])
  public wishlists: Wishlist[];
}

export default Movie;
