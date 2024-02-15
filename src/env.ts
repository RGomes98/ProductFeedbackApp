import { envSchema } from './lib/schemas/env-schema';

export const env = envSchema.parse(process.env);
