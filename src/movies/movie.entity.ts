import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Wishlist from '../wishlists/wishlist.entity';

@Entity()
class Movie {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public externalId: string;

  @ManyToMany(() => Wishlist, (wishlist: Wishlist) => wishlist.movies)
  @JoinTable()
  public wishlists: Wishlist[];
}

export default Movie;
