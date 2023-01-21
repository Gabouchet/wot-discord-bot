import { registerAs } from '@nestjs/config';

export default registerAs('s3', () => ({
  url: process.env.S3_BUCKET_URL,
}));
