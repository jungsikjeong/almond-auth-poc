'use client';

import { signout } from '@/lib/api/signout';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      await signout();
      router.push('/auth/login');
    });
  };

  return (
    <button onClick={handleLogout} disabled={isPending}>
      {isPending ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
}
