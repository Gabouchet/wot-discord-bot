import { Client, ActivityType } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { CommandService } from './command.service';

@Injectable()
export class BotService {
  constructor(private client: Client, private commandService: CommandService) {
    this.client.on('interactionCreate', (interaction) => {
      if (interaction.isChatInputCommand()) {
        this.commandService.executeCommand(
          interaction.commandName,
          interaction,
        );
      }
    });
    client.user.setPresence({
      status: 'online',
      activities: [
        {
          type: ActivityType.Playing,
          name: 'against arta',
        },
      ],
    });
  }
}
