import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import replayApiConfig from 'src/configs/replay-api.config';
import { request, gql } from 'graphql-request';
import { BattleInformations } from './dto/battle-informations.dto';

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

  async battleInformations(replayUrl: string) {
    const query = gql`
      {
        replay(url: "${replayUrl}") {
          map {
            name
            displayName
          }
          date
          player {
            id
            name
          }
          version {
            executable
            xml
          }
          server {
            name
            regionCode
          }
        }
      }
    `;
    try {
      return await request<BattleInformations>(`${this.url}/graphql`, query);
    } catch (error) {
      console.error(error);
      const errorString =
        error?.response?.errors[0]?.message ?? 'An error occured';
      throw new Error(errorString);
    }
  }
}
