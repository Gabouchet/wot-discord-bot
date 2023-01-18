import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'discord.js';
import { ReplayModule } from 'src/replay/replay.module';
import discordConfig from '../configs/discord.config';
import { BotService } from './bot.service';
import { CommandService } from './command.service';
import { RestService } from './rest.service';

function factory(configService: ConfigService): Promise<Client> {
  return new Promise((resolve) => {
    const client = new Client({
      intents: [],
    });
    client.on('ready', () => {
      resolve(client);
    });
    client.login(configService.getOrThrow('discordConfig').bot.token);
  });
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [discordConfig],
    }),
  ],
  providers: [
    {
      provide: Client,
      inject: [ConfigService],
      useFactory: factory,
    },
    BotService,
    RestService,
    CommandService,
  ],
  exports: [BotService, RestService, CommandService],
})
export class DiscordModule {}
