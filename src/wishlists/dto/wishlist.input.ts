import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateWishlistInput {
  @Field()
  name: string;
}

@InputType()
export class WishlistInput {
  @Field()
  id: string;

  @Field()
  name: string;
}
