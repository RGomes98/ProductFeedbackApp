import { PrismaClient } from '@prisma/client';
import { env } from '@/env';

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: env.NODE_ENV === 'development' ? env.POSTGRES_PRISMA_URL_LOCAL : env.POSTGRES_PRISMA_URL,
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== 'production') globalThis.prisma = prisma;
