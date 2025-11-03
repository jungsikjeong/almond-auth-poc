'use server';

import { clearTokenCookies } from '../data/cookies';

export async function signout() {
  await clearTokenCookies();
}
