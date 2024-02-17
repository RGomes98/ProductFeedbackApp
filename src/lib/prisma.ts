import { PrismaClient } from '@prisma/client';
import { env } from '@/env';

export const prisma = new PrismaClient({
  datasources: {
    db: { url: env.NODE_ENV === 'development' ? env.POSTGRES_URL_NO_SSL : env.POSTGRES_PRISMA_URL },
  },
});
