import { Args, Mutation, Resolver } from '@nestjs/graphql';
import User from 'src/users/user.entity';
import { AuthenticationService } from './auth.service';
import RegisterInput, { LogInInput } from './dto/auth.input';

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @Mutation(() => String)
  async register(@Args('userData') userData: RegisterInput) {
    return this.authenticationService.register(userData);
  }

  @Mutation(() => String)
  async logIn(@Args('userData') userData: LogInInput) {
    const user = await this.authenticationService.getAuthenticatedUser(
      userData.email,
      userData.password,
    );
    const token = this.authenticationService.getToken(user.id);

    return token;
  }
}
