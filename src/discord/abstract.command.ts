import {
  CacheType,
  ChatInputCommandInteraction,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

export abstract class Command {
  abstract name: string;
  abstract discordObject: RESTPostAPIChatInputApplicationCommandsJSONBody;
  abstract execute(
    interaction: ChatInputCommandInteraction<CacheType>,
  ): Promise<void>;
}
