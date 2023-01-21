import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import replayApiConfig from '../configs/replay-api.config';
import { request, gql } from 'graphql-request';
import { Replay } from './dto/battle-informations.dto';

@Injectable()
export class ReplayService {
  private readonly url: string;

  constructor(
    @Inject(replayApiConfig.KEY)
    private config: ConfigType<typeof replayApiConfig>,
  ) {
    if (!config.url) {
      throw new Error('REPLAY_API_URL is not set');
    }
    this.url = this.config.url;
  }

  async battleInformations(replayUrl: string): Promise<Replay> {
    const query = gql`
      {
        replay(url: "${replayUrl}") {
          map {
            displayName
          }
          player {
            name,
            vehicle {
              displayName
            }
          }
          date
          version {
            executable
          }
          server {
            name
          }
        }
      }
    `;
    try {
      return await (
        await request<{ replay: Replay }>(`${this.url}/graphql`, query)
      ).replay;
    } catch (error) {
      console.error(error);
      const errorString =
        error?.response?.errors[0]?.message ?? 'An error occured';
      throw new Error(errorString);
    }
  }
}
