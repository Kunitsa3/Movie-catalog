import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() dto: AuthDto) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {}

  @Post('changeLoginDetails')
  async changeLoginDetails(@Body() dto: AuthDto) {}

  @Delete('delete')
  async delete(@Body() dto: AuthDto) {}
}
