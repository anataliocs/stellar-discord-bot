import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-auth0';

@Injectable()
export class DiscordStrategy extends PassportStrategy(
  Strategy,
  'discord-0auth',
) {
  constructor(private authService: AuthService) {
    super({
      clientID: 'TODO',
      clientSecret:
        'TODO',
      callbackURL: 'http://localhost:3000/callback',
      domain: 'dev-3xssr21qwrtz222y.us.auth0.com',
      state: false,
      passReqToCallback: true,
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}
