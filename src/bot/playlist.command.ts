/* playlist.command.ts */

import { Command, Handler } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';
import { Injectable, Logger } from '@nestjs/common';

@Command({
  name: 'playlist',
  description: 'Get current playlist',
  dmPermission: true,
})
@Injectable()
export class PlaylistCommand {
  private readonly logger = new Logger(PlaylistCommand.name);

  @Handler()
  onPlaylist(interaction: CommandInteraction): string {
    this.logger.log(`User ${interaction.user.id} executed playlist!`);
    return 'List with music...';
  }
}
