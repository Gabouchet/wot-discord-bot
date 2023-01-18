import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';
import { ReplayModule } from './replay/replay.module';

@Module({
  imports: [DiscordModule, ReplayModule],
  providers: [AppService],
})
export class AppModule {}
