'use server';

import type { BuiltInProviderType } from 'next-auth/providers';
import { signIn, signOut } from '@/auth';

export const signInAction = async (formData: FormData) => {
  await signIn(formData.get('provider') as BuiltInProviderType, { redirectTo: '/' });
};

export const signOutAction = async () => await signOut();
