import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import replayApiConfig from '../configs/replay-api.config';
import { request, gql } from 'graphql-request';
import { Replay } from './dto/battle-informations.dto';
import s3Config from 'src/configs/s3.config';

@Injectable()
export class ReplayService {
  private readonly url: string;
  private readonly s3Url: string;

  constructor(
    @Inject(replayApiConfig.KEY)
    private replayConfig: ConfigType<typeof replayApiConfig>,
    @Inject(s3Config.KEY)
    private s3Configs: ConfigType<typeof s3Config>,
  ) {
    if (!replayConfig.url) {
      throw new Error('REPLAY_API_URL is not set');
    }
    if (!s3Configs.url) {
      throw new Error('S3_BUCKET_URL is not set');
    }

    this.url = this.replayConfig.url;
    this.s3Url = this.s3Configs.url;
  }

  resourceUrl(filepath: string) {
    return `${this.s3Url}${filepath}`;
  }

  async battleInformations(replayUrl: string): Promise<Replay> {
    const query = gql`
      {
        replay(url: "${replayUrl}") {
          map {
            name
            displayName
          }
          player {
            name
            vehicle {
              name
              displayName
              nation {
                name
              }
            }
            score {
              assistance {
                total
              }
              damages
              xp {
                base
              }
              kills
              shots {
                total
                directHit
                penetration
              }
            }
          }
          date
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
