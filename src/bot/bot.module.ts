import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { RegisterCommand } from './register.command';
import { CreateWalletCommand } from './create-wallet.command';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [DiscordModule.forFeature(), HttpModule],
  providers: [BotGateway, RegisterCommand, CreateWalletCommand],
})
export class BotModule {}
