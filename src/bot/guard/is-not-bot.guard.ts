import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Message } from 'discord.js';

export class IsNotBotGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const message: Message = context.getArgByIndex(0);

    return !message.author.bot;
  }
}
