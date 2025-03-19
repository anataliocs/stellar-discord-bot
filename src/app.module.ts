import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BotModule } from './bot/bot.module';
import { GatewayIntentBits, Partials } from 'discord.js';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        token: configService.get('DISCORD_TOKEN'),
        registerCommandOptions: [
          {
            forGuild: configService.get('SERVER_ID'),
            removeCommandsBefore: true,
          },
        ],
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
          ],
          partials: [
            Partials.Channel,
            Partials.User,
            Partials.Message,
            Partials.ThreadMember,
            Partials.GuildMember,
          ],
        },
        autoLogin: true,
      }),
    }),
    BotModule,
    AuthModule,
    UsersModule,
    PassportModule,
    HttpModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
