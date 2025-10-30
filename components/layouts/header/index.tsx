'use client';

import LogoutButton from '@/components/buttons/logout-button';
import { useUser } from '@/contexts/user-context';
import Link from 'next/link';

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex justify-end py-4 px-8">
      <ul className="flex gap-4">
        <li>
          <Link href="/mypage">
            <button>마이페이지</button>
          </Link>
        </li>

        <li>
          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/auth/login">
              <button>로그인</button>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}
