import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import wotReplayApiConfig from '../configs/replay-api.config';
import { ReplayService } from './replay.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [wotReplayApiConfig],
    }),
  ],
  providers: [ReplayService],
  exports: [ReplayService],
})
export class ReplayModule {}
