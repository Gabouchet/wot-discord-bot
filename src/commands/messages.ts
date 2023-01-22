import { InteractionEditReply } from '../discord/abstract.reply';
import { ReplayService } from '../replay/replay.service';
import { Replay } from '../replay/dto/battle-informations.dto';

export class ReplayEditReply extends InteractionEditReply {
  constructor(
    private replay: Replay,
    private replayService: ReplayService,
    private replayUrl?: string,
  ) {
    super();
  }

  get() {
    return {
      content: null,
      components: [],
      embeds: [
        {
          title: `${this.replay.player.vehicle.displayName} - ${this.replay.map.displayName}`,
          color: 65453,
          image: {
            url: this.replayService.resourceUrl(
              `/maps/backgrounds/500x235/${this.replay.map.name.toLowerCase()}.png`,
            ),
          },
          thumbnail: {
            url: `${this.replayService.resourceUrl(
              `/vehicles/previews/420x307/${this.replay.player.vehicle.name.toLowerCase()}.png`,
            )}`,
          },
          author: {
            name: this.replay.player.name,
            icon_url: `${this.replayService.resourceUrl(
              `/vehicles/icons/${this.replay.player.vehicle.nation.name}-${this.replay.player.vehicle.name}.png`,
            )}`,
          },
          footer: {
            text: this.replay.date,
          },
          fields: [
            {
              name: 'Base XP',
              value: this.replay.player.score.xp.base.toString(),
            },
            {
              name: 'Damages',
              value: this.replay.player.score.damages.toString(),
            },
            {
              name: 'Kills',
              value: this.replay.player.score.kills.toString(),
            },
            {
              name: 'Shots',
              value: `${this.replay.player.score.shots.total.toString()} / ${this.replay.player.score.shots.directHit.toString()} / ${this.replay.player.score.shots.penetration.toString()}`,
            },
            {
              name: 'Assists',
              value: this.replay.player.score.assistance.total.toString(),
            },
            ...(this.replayUrl
              ? [
                  {
                    name: 'Replay link',
                    value: this.replayUrl,
                  },
                ]
              : []),
          ],
        },
      ],
    };
  }
}
