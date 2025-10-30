/** @format */

'use server';

import { cookies, headers } from 'next/headers';
import { cache } from 'react';
import { serverApi } from '../server-api';
import { UserBasicInfo } from '@/types/user';
import { ApiError } from '../api-error';

export const fetchCurrentUser = cache(
  async (): Promise<UserBasicInfo | null> => {
    const cookieStore = await cookies();
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';
    const countryCode = pathname.split('/')[1] || 'kr';

    try {
      const dto = await serverApi('/users/detail', {
        cache: 'no-store',
      });
      return dto;
    } catch (error) {
      throw error;
    }
  }
);
