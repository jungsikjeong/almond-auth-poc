import LoginTemplate from '@/features/auth/login/templates/login-template.tsx';
import { fetchCurrentUser } from '@/lib/api/me';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const currentUser = await fetchCurrentUser().catch(() => null);

  if (currentUser) {
    redirect('/');
  }

  return <LoginTemplate />;
}
