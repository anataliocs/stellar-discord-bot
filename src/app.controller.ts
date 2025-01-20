import {
  Controller,
  Get,
  Logger,
  Query,
  Headers,
  Request,
  Response,
  UseGuards,
  Header,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { DiscordAuthGuard } from './auth/discord.guard';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private authService: AuthService) {}

  @UseGuards(DiscordAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('callback')
  callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Request() req,
    @Response() res,
  ) {
    return res.redirect(
      302,
      `https://discord.com/oauth2/authorize?client_id=1309255291048558632&code=${code}&state=${state}`,
    );
  }
}
