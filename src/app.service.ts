import { Injectable } from '@nestjs/common';
import { ReplayCommand } from './commands/replay.command';
import { CommandService } from './discord/command.service';

@Injectable()
export class AppService {
  constructor(commandService: CommandService) {
    commandService.registerCommand(new ReplayCommand());
  }
}
