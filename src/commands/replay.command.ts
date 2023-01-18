import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { ReplayService } from 'src/replay/replay.service';
import { Command } from '../discord/abstract.command';

export class ReplayCommand extends Command {
  name = 'replay';
  discordObject = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription('Display some informations about the replay file provided')
    .addAttachmentOption((option) =>
      option
        .setName('replay')
        .setDescription('The replay file to analyze')
        .setRequired(true),
    )
    .toJSON();

  constructor(private replayService: ReplayService) {
    super();
  }

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.deferReply();

    const file = interaction.options.getAttachment('replay');
    const response = await this.replayService.battleInformations(file.url);
    await interaction.editReply(`${JSON.stringify(response)}`);
  }
}
