import { registerAs } from '@nestjs/config';

export default registerAs('replayApi', () => ({
  url: process.env.REPLAY_API_URL,
}));
