'use server';

import { revalidateTag } from 'next/cache';
import {
  getCacheTag,
  removeAccessToken,
  removeCartId,
  removeMedusaAuthToken,
  removeRefreshToken,
} from '../data/cookies';
import { serverApi } from '../server-api';

export async function signout() {
  await serverApi('/auth/signout', {
    method: 'POST',
    body: JSON.stringify({}),
  });

  await removeMedusaAuthToken();
  await removeAccessToken();
  await removeRefreshToken();

  const customerCacheTag = await getCacheTag('customers');
  revalidateTag(customerCacheTag);

  await removeCartId();

  const cartCacheTag = await getCacheTag('carts');
  revalidateTag(cartCacheTag);
}
