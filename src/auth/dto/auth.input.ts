import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@InputType()
export class LogInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

export default RegisterInput;
