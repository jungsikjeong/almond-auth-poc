import ProtectedRoute from '@/components/protected-route';
import MypageTemplate from '@/features/mypage/templates/mypage-template';

export default async function MypagePage() {
  return (
    <ProtectedRoute>
      <MypageTemplate />
    </ProtectedRoute>
  );
}
