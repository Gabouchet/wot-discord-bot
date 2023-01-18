import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [DiscordModule],
  providers: [AppService],
})
export class AppModule {}
