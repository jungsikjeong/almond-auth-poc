/** @format */

'use client';

import { login } from '@/lib/api/login';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [state, formAction, isPending] = useActionState(login, null);

  const handleSubmit = (formData: FormData) => {
    const redirectTo = searchParams.get('redirect_to') || '/';

    formData.append('redirect_to', redirectTo);

    formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="loginId" placeholder="Login ID" required />
      <input type="password" placeholder="Password" name="password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인하기'}
      </button>
    </form>
  );
}
