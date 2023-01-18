import {
  Client,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import { REST, Routes } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { Command } from './abstract.command';

@Injectable()
export class RestService {
  private readonly logger = new ConsoleLogger();

  private readonly userId: string;
  private restClient: REST;

  constructor(private configService: ConfigService, readonly client: Client) {
    this.userId = client.user.id;
    this.restClient = new REST().setToken(
      configService.getOrThrow('discordConfig').bot.token,
    );
  }

  async registerSlashedCommands(commands: Command[]) {
    const res = (await this.restClient.put(
      Routes.applicationCommands(this.userId),
      {
        body: commands.map((command) => command.discordObject),
      },
    )) as RESTPostAPIChatInputApplicationCommandsJSONBody[];
    res.forEach((command) => {
      this.logger.log(
        `Global command /${command.name} registered`,
        RestService.name,
      );
    });
  }
}
