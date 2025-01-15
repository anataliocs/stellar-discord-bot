import { Injectable } from '@nestjs/common';
import {
  DiscordModuleOption,
  DiscordOptionsFactory,
} from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';

@Injectable()
export class DiscordConfigService implements DiscordOptionsFactory {
  createDiscordOptions(): DiscordModuleOption {
    return {
      token: 'your-bot-token',
      discordClientOptions: {
        intents: [GatewayIntentBits.Guilds],
      },
    };
  }
}