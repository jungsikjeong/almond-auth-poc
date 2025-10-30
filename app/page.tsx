/** @format */

import Header from '@/components/layouts/header';
import ProtectedRoute from '@/components/protected-route';

export default function Home() {
  return (
    <>
      <div>
        <Header />
        <main className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">Home</h1>
          <p>Welcome to the home page</p>
        </main>
      </div>
    </>
  );
}
