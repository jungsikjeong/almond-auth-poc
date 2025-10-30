/** @format */

'use client';

import { login } from '@/lib/api/login';
import { useActionState } from 'react';

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form action={formAction}>
      <input type="text" name="loginId" placeholder="Login ID" required />
      <input type="password" placeholder="Password" name="password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인하기'}
      </button>
    </form>
  );
}
