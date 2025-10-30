import ProtectedRoute from '@/components/protected-route';
import { fetchCurrentUser } from '@/lib/api/me';

export default async function MypagePage() {
  // 예시 1
  /**
   * // 여기서 발생한 401은 ProtectedRoute가 감지를못하고 보기싫은 브라우저 에러를 띄움
   * 이유는 nextjs의 의 bottom-top 렌더링으로인해서 감싼곳에서쓰면 401을감지못하기때문임
   */
  const currentUser = await fetchCurrentUser();

  // 예시 2
  /**
   * 이렇게하면 보기싫은 브라우저 에러를띄우진않고 null을 띄움
   * /auth/login 페이지가 이런식으로 처리를해주고있는데, currentUser정보가 크게 중요하지않은 페이지라면 그렇게해도됨
   * 허나 마이페이지처럼 currentUser정보로 다른 api를 호출해야하는 경우라면 이렇게 하면 안됨
   */
  const currentUser2 = await fetchCurrentUser().catch(() => null);
  return (
    <ProtectedRoute>
      <div>Mypage</div>
    </ProtectedRoute>
  );
}

// 예시3
/**
 * 그렇기때문에 아래처럼 ssr환경인 템플릿을 하나 만들고 그안에서 user정보를 가져오는 방식으로 해야함
 */
export default async function MypagePage3() {
  return (
    <ProtectedRoute>
      <MyPageTemplate />
    </ProtectedRoute>
  );
}

async function MyPageTemplate() {
  const currentUser = await fetchCurrentUser();
  return (
    <div>
      <h1>Mypage</h1>
    </div>
  );
}
