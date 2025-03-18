import { CanActivate, ExecutionContext } from '@nestjs/common';
import { DEV_HELP_CHANNEL } from '../../constants';
import { ChannelType } from 'discord.js';

export class IsPublicThreadChannelType implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const message = context.getArgByIndex(0);

    return message.channel.type === ChannelType.PublicThread;
  }
}
