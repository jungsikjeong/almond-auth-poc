'use client';

import { useUser } from '@/contexts/user-context';
import { signout } from '@/lib/api/signout';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setUser } = useUser();

  const handleLogout = () => {
    startTransition(async () => {
      try {
        await signout();
        setUser(null);
        router.push('/');
      } catch (error) {
        console.error('로그아웃 중 오류가 발생했습니다:', error);
      }
    });
  };

  return (
    <button onClick={handleLogout} disabled={isPending}>
      {isPending ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
}
