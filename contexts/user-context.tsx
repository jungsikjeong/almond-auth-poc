'use client';

import { UserBasicInfo } from '@/types/user';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<{
  user: UserBasicInfo | null;
  setUser: (user: UserBasicInfo | null) => void;
} | null>(null);

export function UserProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserBasicInfo | null;
}) {
  const [user, setUser] = useState<UserBasicInfo | null>(initialUser);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
