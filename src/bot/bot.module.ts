import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { PlaylistCommand } from './playlist.command';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [BotGateway, PlaylistCommand],
})
export class BotModule {}
