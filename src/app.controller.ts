import { Controller, Get, Logger, Request, UseGuards } from '@nestjs/common';
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
  callback(@Request() req) {
    this.logger.log(req.user);
    this.logger.log(req.body);
    return req.user;
  }
}
