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
      await interaction.editReply({
        content: null,
        embeds: [
          {
            title: (url?.split('/').pop() ?? attachement.name).replace(
              '.wotreplay',
              '',
            ),
            description: 'Here some informations about your replay:',
            color: 65453,
            fields: [
              {
                name: 'Map',
                value: `${response.map.displayName} (${response.map.name})`,
              },
              {
                name: 'Date',
                value: response.date,
              },
              {
                name: 'Player',
                value: `${response.player.name}`,
              },
              {
                name: 'Version',
                value: `${response.version.executable}`,
              },
              {
                name: 'Server',
                value: `${response.server.name}`,
              },
            ],
          },
        ],
        attachments: [],
      });
    } catch (error) {
      await interaction.editReply({ content: error.message });
    }
  }
}
