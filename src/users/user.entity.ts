import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Field()
  @Column()
  public password: string;
}

export default User;
