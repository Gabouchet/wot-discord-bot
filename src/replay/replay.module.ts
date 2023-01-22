import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import s3Config from '../configs/s3.config';
import wotReplayApiConfig from '../configs/replay-api.config';
import { ReplayService } from './replay.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [wotReplayApiConfig, s3Config],
    }),
  ],
  providers: [ReplayService],
  exports: [ReplayService],
})
export class ReplayModule {}
