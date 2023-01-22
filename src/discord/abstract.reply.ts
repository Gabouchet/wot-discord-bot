import { InteractionEditReplyOptions, MessagePayload } from 'discord.js';

export type InteractionEditReplyObject =
  | string
  | MessagePayload
  | InteractionEditReplyOptions;

export abstract class InteractionEditReply {
  abstract get(): InteractionEditReplyObject;
}
