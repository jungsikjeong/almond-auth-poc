'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    <form action={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label
          htmlFor="loginId"
          className="text-sm font-medium text-foreground"
        >
          아이디
        </Label>
        <Input
          id="loginId"
          name="loginId"
          type="text"
          placeholder="아이디"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            비밀번호
          </Label>
          <a
            href="#"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="h-11"
        />
      </div>

      <Button
        type="submit"
        className="w-full h-11 font-medium"
        disabled={isPending}
      >
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
