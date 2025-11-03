import { Toaster } from 'sonner';

export default async function AuthLayout({
  children,
  params,
}: {
  params: Promise<{ countryCode: string }>;
  children: React.ReactNode;
}) {
  const { countryCode } = await params;
  const pageTitle = `/${countryCode}/auth`;
  return (
    <div className="min-h-screen">
      <main className="flex-1">{children}</main>
      <Toaster />
    </div>
  );
}
