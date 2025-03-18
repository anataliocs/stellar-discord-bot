import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { RegisterCommand } from './register.command';
import { CreateWalletCommand } from './create-wallet.command';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DiscordModule.forFeature(), HttpModule, ConfigModule],
  providers: [BotGateway, RegisterCommand, CreateWalletCommand],
})
export class BotModule {}
