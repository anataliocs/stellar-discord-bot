/* playlist.command.ts */

import { ModalFieldsTransformPipe } from '@discord-nestjs/common';
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
  name: 'register',
  description: 'Register as Core Stellar Builder',
  type: ApplicationCommandType.ChatInput,
})
@Injectable()
export class RegisterCommand {
  private readonly logger = new Logger(RegisterCommand.name);

  @Handler()
  async register(interaction: CommandInteraction): Promise<void> {
    const modal = new ModalBuilder()
      .setTitle('Register as Core Builder')
      .setCustomId('modal-title');

    const firstNameInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('first-name-input')
      .setLabel('First Name')
      .setStyle(TextInputStyle.Short);

    const lastNameInputComponent = new TextInputBuilder()
      .setMaxLength(1_000)
      .setCustomId('last-name-input')
      .setLabel('Last Name')
      .setStyle(TextInputStyle.Short);

    const githubInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('github-input')
      .setLabel('Github')
      .setStyle(TextInputStyle.Short);

    const emailInputComponent = new TextInputBuilder()
      .setMaxLength(1_000)
      .setCustomId('email-input')
      .setLabel('Email')
      .setStyle(TextInputStyle.Short);

    const telegramInputComponent = new TextInputBuilder()
      .setMaxLength(1_00)
      .setCustomId('telegram-input')
      .setLabel('Telegram')
      .setRequired(false)
      .setStyle(TextInputStyle.Short);

    const rows = [
      firstNameInputComponent,
      lastNameInputComponent,
      githubInputComponent,
      emailInputComponent,
      telegramInputComponent,
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
    @IA(ModalFieldsTransformPipe) registerDto: RegisterDto,
    @EventParams() eventArgs: ClientEvents['interactionCreate'],
  ): Promise<InteractionResponse> {
    if (eventArgs.length <= 0) return;
    const modal = eventArgs[0];

    if (!modal.isModalSubmit()) return;

    this.logger.log(`Modal ${modal.id} submit`);

    const responseEmbed: JSONEncodable<APIEmbed> = new EmbedBuilder()
      .setTitle('Registered as Core Builder')
      .setURL('https://developers.stellar.org')
      .setImage(`${modal.user.avatarURL()}`)
      .setColor(Colors.Yellow)
      .setDescription('Thanks for registering')
      .setTimestamp()
      .addFields({
        name: 'Joined',
        value: `${modal.user.createdAt}`,
        inline: true,
      });

    const options: BaseMessageOptions = {
      content: `${registerDto.firstName.value} Registered`,
      embeds: [responseEmbed],
    };

    const payload = MessagePayload.create(modal, options);

    return modal.reply(payload);
  }
}
