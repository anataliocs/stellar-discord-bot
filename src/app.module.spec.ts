import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { BotGateway } from './bot/bot.gateway';

describe('AppModule Integration', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should import AppModule without errors', () => {
    expect(appModule).toBeDefined();
  });

  it('should provide AppController', () => {
    const appController = appModule.get<AppController>(AppController);
    expect(appController).toBeDefined();
  });

  it('should provide AuthService', () => {
    const authService = appModule.get<AuthService>(AuthService);
    expect(authService).toBeDefined();
  });

  it('should provide UsersService', () => {
    const usersService = appModule.get<UsersService>(UsersService);
    expect(usersService).toBeDefined();
  });

  it('should provide BotGateway', () => {
    const botGateway = appModule.get<BotGateway>(BotGateway);
    expect(botGateway).toBeDefined();
  });
});
