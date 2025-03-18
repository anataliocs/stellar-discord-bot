/* playlist.command.ts */

import { Command, EventParams, Handler, IA, On } from '@discord-nestjs/core';
import {
  ActionRowBuilder,
  APIEmbed,
  ApplicationCommandType,
  AttachmentBuilder,
  BaseMessageOptions,
  ClientEvents,
  codeBlock,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  JSONEncodable,
  MessagePayload,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  SlashCommandBuilder,
  TextInputBuilder,
  TextInputStyle,
  UserSelectMenuBuilder,
} from 'discord.js';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { IsModalInteractionGuard } from './guard/is-modal-interaction.guard';
import { RegisterDto } from './dto/register.dto';
import { InteractionCallbackResponse } from 'discord.js/typings';

@Command({
  name: 'create-wallet',
  description: 'Create Smart Wallet',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
export class CreateWalletCommand {
  private readonly logger = new Logger(CreateWalletCommand.name);

  @Handler()
  async createWallet(interaction: CommandInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setTitle('Go away nosy people')
      .setCustomId('modal-title');

    const firstNameInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('first-name-input')
      .setLabel('First Name')
      .setStyle(TextInputStyle.Short);

    const lastNameInputComponent = new TextInputBuilder()
      .setMaxLength(1_000)
      .setCustomId('last-name-input')
      .setLabel('Not using Discord OAuth2')
      .setStyle(TextInputStyle.Short);

    const githubInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('github-input')
      .setLabel('To create a passkeys smart wallet')
      .setStyle(TextInputStyle.Short);

    const rows = [
      firstNameInputComponent,
      lastNameInputComponent,
      githubInputComponent,
    ].map((component) =>
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        component,
      ),
    );

    modal.addComponents(...rows);

    this.logger.log(`User ${interaction.user.id} registered!`);

    await interaction.showModal(modal, {
      withResponse: true,
    });
  }

  @On('interactionCreate')
  @UseGuards(IsModalInteractionGuard)
  async onModuleSubmit(
    res,
    @EventParams() eventArgs: ClientEvents['interactionCreate'],
  ): Promise<InteractionResponse> {
    if (eventArgs.length <= 0) return;
    const modal = eventArgs[0];

    if (!modal.isModalSubmit()) return;

    this.logger.log(`Modal ${modal.id} submit`);

    const responseEmbed: JSONEncodable<APIEmbed> = new EmbedBuilder()
      .setTitle('Your smart wallet has not been created b/c :p')
      .setURL('https://developers.stellar.org')
      .setImage(`${modal.user.avatarURL()}`)
      .setColor(Colors.Yellow)
      .setDescription('Thanks for going away')
      .setTimestamp()
      .addFields({
        name: 'Joined',
        value: `${modal.user.createdAt}`,
        inline: true,
      });

    const options: BaseMessageOptions = {
      content: `Go Away`,
      embeds: [responseEmbed],
    };

    const payload = MessagePayload.create(modal, options);

    return modal.reply(payload);
  }
}
