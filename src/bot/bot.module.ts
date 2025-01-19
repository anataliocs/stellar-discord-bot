import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { RegisterCommand } from './register.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, RegisterCommand],
})
export class BotModule {}
