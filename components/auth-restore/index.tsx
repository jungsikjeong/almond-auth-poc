/** @format */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const MAX_ATTEMPTS = 2;

export default function AuthRestore() {
  const router = useRouter();
  const pathname = usePathname();
  const [attempts, setAttempts] = useState(0);
  const isRestoring = useRef(false);

  useEffect(() => {
    // 이미 재발급 중이거나 최대 시도 횟수 초과
    if (isRestoring.current || attempts >= MAX_ATTEMPTS) {
      if (attempts >= MAX_ATTEMPTS) {
        handleAuthFail();
      }
      return;
    }

    isRestoring.current = true;

    const restoreToken = async () => {
      try {
        const res = await fetch('/auth/restore-token', {
          method: 'POST',
          signal: AbortSignal.timeout(3000),
        });

        if (res.ok) {
          router.refresh();
        } else {
          setAttempts((prev) => prev + 1);
        }
      } catch (error) {
        console.error('토큰 복구 실패:', error);
        setAttempts((prev) => prev + 1);
      } finally {
        isRestoring.current = false;
      }
    };

    // 첫 시도는 즉시, 이후는 1초 대기
    const delay = attempts === 0 ? 0 : 1000;
    const timer = setTimeout(restoreToken, delay);

    return () => clearTimeout(timer);
  }, [attempts, router]);

  const handleAuthFail = () => {
    const isMainPage = pathname === '/';

    if (isMainPage) {
      router.replace('/auth/login');
    } else {
      router.replace(`/auth/login?redirect_to=${encodeURIComponent(pathname)}`);
    }
  };

  // todo: 로딩 변경
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500">인증 상태를 복구 중입니다...</p>
      </div>
    </div>
  );
}
