import { Injectable } from '@nestjs/common';
import { ReplayCommand } from './commands/replay.command';
import { CommandService } from './discord/command.service';
import { ReplayService } from './replay/replay.service';

@Injectable()
export class AppService {
  constructor(
    private commandService: CommandService,
    private replayService: ReplayService,
  ) {
    this.commandService.registerCommand(new ReplayCommand(this.replayService));
  }
}
