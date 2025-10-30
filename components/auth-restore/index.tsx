/** @format */

'use client';

import { clientApi } from '@/lib/client-api';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const MAX_ATTEMPTS = 2;

export default function AuthRestore() {
  const router = useRouter();
  const pathname = usePathname();

  const attemptsRef = useRef(0);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;

    if (attemptsRef.current >= MAX_ATTEMPTS) {
      handleAuthFail();
      return;
    }

    hasRunRef.current = true;

    const restore = async () => {
      try {
        await clientApi(
          '/auth/restore-token',
          { method: 'POST' },
          { signal: AbortSignal.timeout(3000) }
        );

        window.location.reload();
      } catch {
        attemptsRef.current++;

        if (attemptsRef.current < MAX_ATTEMPTS) {
          setTimeout(restore, 1000);
        } else {
          handleAuthFail();
        }
      }
    };

    restore();
  }, []);

  // const handleAuthFail = async () => {
  //   const currentPath = window.location.pathname
  //   const countryCode = currentPath.split("/")[1] || "kr"

  //   // if (currentPath === "/" || currentPath === `/${countryCode}/`) {
  //   //   await signout(countryCode)
  //   // } else {
  //   router.replace(`/${countryCode}/auth/login`)
  //   // }
  // }

  const handleAuthFail = async () => {
    const countryCode = pathname.split('/')[1] || 'kr';
    const isMainPage =
      pathname === '/' ||
      pathname === `/${countryCode}` ||
      pathname === `/${countryCode}/`;

    if (isMainPage) {
      console.log('메인 페이지');
      // await signout(countryCode)
      // window.location.reload()
    } else {
      console.log('다른 페이지');
      // router.replace(
      //   `/${countryCode}/auth/login?returnUrl=${encodeURIComponent(pathname)}`
      // )
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">인증 상태를 복구 중입니다...</p>
    </div>
  );
}
