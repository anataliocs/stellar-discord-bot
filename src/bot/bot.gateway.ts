import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Once, InjectDiscordClient, On } from '@discord-nestjs/core';
import {
  APIEmbed,
  Client,
  Message,
  messageLink,
  ThreadChannel,
} from 'discord.js';
import { HttpService } from '@nestjs/axios';
import { IsNotBotGuard } from './guard/is-not-bot.guard';
import { IsDevHelpChannel } from './guard/is-dev-help-channel-type.guard';
import { IsPublicThreadChannelType } from './guard/is-thread-channel-type.guard';
import { ConfigService } from '@nestjs/config';
import { DEV_HELP_CHANNEL, getTagById, SERVER_ID } from '../constants';

@Injectable()
export class BotGateway {
  private readonly logger = new Logger(BotGateway.name);

  private readonly debug: boolean = true;

  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  @Once('ready')
  onReady() {
    this.logger.log(
      `Bot Tag: ${this.client.user.tag} Id: ${this.client.user.id} was started at ${this.client.readyAt}`,
    );
    this.debugInfo();
  }

  @On('messageCreate')
  @UseGuards(IsNotBotGuard, IsDevHelpChannel, IsPublicThreadChannelType)
  async onMessage(message: Message): Promise<void> {
    if (this.debug) {
      this.logger.log(`msg received: ${JSON.stringify(message)}`);
    }

    const title = message.channel.isThread() ? message.channel.name : '';
    // TODO use getTagById() function to populate tags from guild forum channel

    this.httpService
      .post(
        this.configService.get<string>('DEV_HELP_SLACK_WEBHOOK'),
        {
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `:discord: ${title}`,
              },
            },
            {
              type: 'context',
              elements: [
                {
                  text: `*${message.createdAt}*  |  ${message.author.username}`,
                  type: 'mrkdwn',
                },
              ],
            },
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `${message.content}`,
              },
            },
            {
              type: 'divider',
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: ':tag: `auth` `deployment` `sdk`',
                },
              ],
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `:link: ${messageLink(message.channel.id, message.id)}`,
                },
              ],
            },
          ],
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .subscribe((value) => {
        this.logger.debug(`Sent Request - ${value.request}`);
        this.logger.debug(`Received ${value.status} ${value.statusText}`);
      });
  }

  private debugInfo() {
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
