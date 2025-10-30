import 'server-only';

import { cookies as nextCookies } from 'next/headers';

export const setTokenCookies = async (
  accessToken: string,
  refreshToken?: string
) => {
  const cookies = await nextCookies();

  cookies.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  if (refreshToken) {
    cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });
  }
};

export const clearTokenCookies = async () => {
  const cookies = await nextCookies();
  cookies.delete('accessToken');
  cookies.delete('refreshToken');
};
