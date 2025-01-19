import { Injectable, Logger } from '@nestjs/common';
import { Once, InjectDiscordClient } from '@discord-nestjs/core';
import { Client } from 'discord.js';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  private readonly debug: boolean = true;

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(
      `Sora Bot Tag: ${this.client.user.tag} Id: ${this.client.user.id} was started at ${this.client.readyAt}`,
    );

    if (this.debug) {
      this.client.rest.handlers.forEach((command) => {
        this.logger.debug(`Registered handler - ${command.id}`);
      });

      this.client.application.flags.toArray().forEach((flag) => {
        this.logger.debug(`Registered flag - ${flag}`);
      });
    }
  }
}
