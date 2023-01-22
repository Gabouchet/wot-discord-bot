import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { ReplayService } from '../replay/replay.service';
import { Command } from '../discord/abstract.command';
import { ReplayEditReply } from './messages';

export class ReplayCommand extends Command {
  name = 'replay';
  discordObject = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription('Display some informations about the replay file provided')
    .addAttachmentOption((option) =>
      option
        .setName('file')
        .setDescription('The replay file to analyze')
        .setRequired(false),
    )
    .addStringOption((option) =>
      option
        .setName('url')
        .setDescription('The replay url to analyze')
        .setRequired(false),
    )
    .toJSON();

  constructor(private replayService: ReplayService) {
    super();
  }

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const attachement = interaction.options.getAttachment('file', false);
    const url = interaction.options.getString('url', false);

    if (!attachement && !url) {
      await interaction.reply({
        content: 'You must provide a replay file or a replay url',
        ephemeral: true,
      });
      return;
    } else if (attachement && url) {
      await interaction.reply({
        content: 'You must provide a replay file or a replay url, not both',
        ephemeral: true,
      });
      return;
    }

    await interaction.deferReply();

    try {
      const response = await this.replayService.battleInformations(
        url ?? attachement.url,
      );
      await interaction.editReply(
        new ReplayEditReply(response, this.replayService, url).get(),
      );
    } catch (error) {
      await interaction.editReply({ content: error.message });
    }
  }
}
