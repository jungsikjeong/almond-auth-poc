import Link from 'next/link';
import LoginForm from '../components/login-form';

export default function LoginTemplate() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Login</h1>

      <header>
        <Link href="/">메인페이지로 이동하기</Link>
      </header>
      <LoginForm />
    </div>
  );
}
