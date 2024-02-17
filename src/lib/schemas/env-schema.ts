import { z } from 'zod';

export const envSchema = z.object({
  POSTGRES_USER: z.coerce.string(),
  POSTGRES_HOST: z.coerce.string(),
  POSTGRES_PASSWORD: z.coerce.string(),
  POSTGRES_DATABASE: z.coerce.string(),
  POSTGRES_URL: z.coerce.string().url(),
  POSTGRES_PRISMA_URL: z.coerce.string().url(),
  POSTGRES_URL_NO_SSL: z.coerce.string().url(),
  POSTGRES_URL_NON_POOLING: z.coerce.string().url(),
  NODE_ENV: z.enum(['production', 'development', 'test']),
  NEXT_AUTH_SECRET: z.coerce.string(),
  GOOGLE_CLIENT_ID: z.coerce.string(),
  GOOGLE_CLIENT_SECRET: z.coerce.string(),
  GITHUB_CLIENT_ID: z.coerce.string(),
  GITHUB_CLIENT_SECRET: z.coerce.string(),
  TWITTER_CLIENT_ID: z.coerce.string(),
  TWITTER_CLIENT_SECRET: z.coerce.string(),
});
