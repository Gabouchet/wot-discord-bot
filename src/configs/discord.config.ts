import { registerAs } from '@nestjs/config';

export default registerAs('discordConfig', () => ({
  bot: {
    token: process.env.DISCORD_BOT_TOKEN,
  },
}));
