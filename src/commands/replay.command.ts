import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
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

  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.deferReply();

    const file = interaction.options.getAttachment('replay');
    const response = await fetch('http://localhost:8000/informations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(file),
    });
    const json = await response.json();

    await interaction.editReply(`${JSON.stringify(json)}`);
  }
}
