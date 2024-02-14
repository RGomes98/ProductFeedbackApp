import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { env } from '@/env';

import Twitter from 'next-auth/providers/twitter';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import NextAuth from 'next-auth';

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  secret: env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ clientId: env.GOOGLE_CLIENT_ID, clientSecret: env.GOOGLE_CLIENT_SECRET }),
    Github({ clientId: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET }),
    Twitter({ clientId: env.TWITTER_CLIENT_ID, clientSecret: env.TWITTER_CLIENT_SECRET }),
  ],
});
