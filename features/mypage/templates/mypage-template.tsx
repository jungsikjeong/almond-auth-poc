import { fetchCurrentUser } from '@/lib/api/me';

export default async function MypageTemplate() {
  const currentUser = await fetchCurrentUser();

  return <div>MypageTemplate</div>;
}
