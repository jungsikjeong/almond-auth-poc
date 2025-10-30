'use server';

import { clearTokenCookies } from '../utils/cookies';

export async function signout() {
  await clearTokenCookies();
}
