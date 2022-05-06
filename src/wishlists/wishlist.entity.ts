import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Movie from '../movies/movie.entity';

@Entity()
class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @ManyToMany(() => Movie, (movie: Movie) => movie.wishlists)
  public movies: Movie[];
}

export default Wishlist;
