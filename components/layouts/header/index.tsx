/** @format */

import { fetchCurrentUser } from '@/lib/api/me';
import Link from 'next/link';

export default async function Header() {
  const currentUser = await fetchCurrentUser();

  return (
    <header className="flex justify-end py-4 px-8">
      {currentUser ? (
        <button>로그아웃</button>
      ) : (
        <Link href="/auth/login">
          <button>로그인</button>
        </Link>
      )}
    </header>
  );
}
