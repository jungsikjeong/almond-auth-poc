import { fetchCurrentUser } from '@lib/api/me';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: Promise<{ countryCode: string }>;
  searchParams: Promise<{ redirect_to?: string }>;
}) {
  const { countryCode } = await params;

  const sp = await searchParams;
  const redirectTo = sp?.redirect_to || '/';
  const currentUser = await fetchCurrentUser().catch(() => null);

  if (currentUser) {
    // redirectTo가 이미 /로 시작하는 경우 처리
    const targetPath = redirectTo.startsWith('/')
      ? redirectTo
      : `/${redirectTo}`;
    redirect(`/${countryCode}${targetPath}`);
  }

  return <>{children}</>;
}
