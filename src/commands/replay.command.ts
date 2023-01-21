import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { ReplayService } from '../replay/replay.service';
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
            title: `${response.player.vehicle.displayName} - ${response.map.displayName}`,
            description: "Here's are some information about your replay:",
            color: 65453,
            image: {
              url: this.replayService.resourceUrl(
                `/maps/backgrounds/500x235/${response.map.name.toLowerCase()}.png`,
              ),
            },
            thumbnail: {
              url: `${this.replayService.resourceUrl(
                `/vehicles/previews/420x307/${response.player.vehicle.name.toLowerCase()}.png`,
              )}`,
            },
            fields: [
              {
                name: 'Base XP',
                value: response.player.score.xp.base.toString(),
              },
              {
                name: 'Damages',
                value: response.player.score.damages.toString(),
              },
              {
                name: 'Kills',
                value: response.player.score.kills.toString(),
              },
              {
                name: 'Shots',
                value: `${response.player.score.shots.total.toString()} / ${response.player.score.shots.directHit.toString()} / ${response.player.score.shots.penetration.toString()}`,
              },
              {
                name: 'Assists',
                value: response.player.score.assistance.total.toString(),
              },
              ...(url
                ? [
                    {
                      name: 'Replay link',
                      value: url,
                    },
                  ]
                : []),
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
