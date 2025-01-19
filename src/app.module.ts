import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { GatewayIntentBits, Message } from 'discord.js';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_TOKEN'),
        registerCommandOptions: [
          {
            forGuild: configService.get('SERVER_ID'),
            allowFactory: (message: Message) =>
              !message.author.bot && message.content === '!deploy',
          },
        ],
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.DirectMessages,
          ],
        },
      }),
    }),
    BotModule,
  ],
})
export class AppModule {}
