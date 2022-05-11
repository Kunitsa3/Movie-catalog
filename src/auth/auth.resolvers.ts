import { Res } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import User from 'src/users/user.entity';
import { AuthenticationService } from './auth.service';
import RegisterInput, { LogInInput } from './dto/auth.input';

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation(() => User)
  async register(@Args('userData') userData: RegisterInput) {
    return this.authenticationService.register(userData);
  }

  @Mutation(() => User)
  async logIn(
    @Args('userData') userData: LogInInput,
    @Context() { res: response }: { res: Response },
  ) {
    const user = await this.authenticationService.getAuthenticatedUser(
      userData.email,
      userData.password,
    );

    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return user;
  }

  @Mutation(() => User)
  async logOut(@Context() { res: response }: { res: Response }) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }
}
