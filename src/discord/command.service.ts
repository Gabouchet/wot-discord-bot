import { Injectable } from '@nestjs/common';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { Command } from './abstract.command';
import { RestService } from './rest.service';

@Injectable()
export class CommandService {
  private registeredCommands: Map<string, Command> = new Map();

  constructor(private restApi: RestService) {}

  async registerCommand(command: Command) {
    await this.apiRegisterCommands([command]);
    this.registeredCommands.set(command.name, command);
  }

  private async apiRegisterCommands(commands: Command[]) {
    return this.restApi.registerSlashedCommands(commands);
  }

  executeCommand(
    commandName: string,
    interaction: ChatInputCommandInteraction<CacheType>,
  ) {
    const command = this.registeredCommands.get(commandName);
    if (command) {
      command.execute(interaction);
    } else {
      throw new Error(`Command ${commandName} not found`);
    }
  }
}
