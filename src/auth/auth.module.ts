import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthenticationController } from './auth.controller';
import { AuthenticationService } from './auth.service';
import { LocalStrategy } from './local.srtategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthModule {}
