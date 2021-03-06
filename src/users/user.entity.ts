import { Field, ObjectType } from '@nestjs/graphql';
import Wishlist from 'src/wishlists/wishlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Field()
  @Column({ unique: true })
  public email: string;

  @Field()
  @Column()
  public username: string;

  @Column()
  public password: string;

  @OneToMany(() => Wishlist, (wishlist: Wishlist) => wishlist.user)
  @Field((type) => [Wishlist])
  public wishlists: Wishlist[];
}

export default User;
