import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.coerce.string().url(),
  NEXT_AUTH_SECRET: z.coerce.string(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  GOOGLE_CLIENT_ID: z.coerce.string(),
  GOOGLE_CLIENT_SECRET: z.coerce.string(),
  GITHUB_CLIENT_ID: z.coerce.string(),
  GITHUB_CLIENT_SECRET: z.coerce.string(),
  TWITTER_CLIENT_ID: z.coerce.string(),
  TWITTER_CLIENT_SECRET: z.coerce.string(),
});
