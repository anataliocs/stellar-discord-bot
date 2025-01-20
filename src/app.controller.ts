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
    res.rawHeaders = req.rawHeaders;

    return res.redirect(
      302,
      `https://dev-3xssr21qwrtz222y.us.auth0.com/authorize/resume?code=${code}&state=${state}`,
    );
  }
}
