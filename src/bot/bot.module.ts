import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { BotGateway } from './bot.gateway';
import { CreateEmbeddedMsgCommand } from './create-embedded-msg.command';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DiscordModule.forFeature(), HttpModule, ConfigModule],
  providers: [BotGateway, CreateEmbeddedMsgCommand],
})
export class BotModule {}
