import { CanActivate, ExecutionContext } from '@nestjs/common';
import { DEV_HELP_CHANNEL } from '../../constants';

export class IsDevHelpChannel implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const message = context.getArgByIndex(0);

    return message.channel.parentId === DEV_HELP_CHANNEL;
  }
}
