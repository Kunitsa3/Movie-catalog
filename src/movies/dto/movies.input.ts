import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MovieInput {
  @Field()
  externalId: string;
}
