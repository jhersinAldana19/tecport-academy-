import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'guest' | 'student' | 'admin';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
}

const AuthContext = createContext<AuthContextType>({
  role: 'guest',
  setRole: () => {},
  userName: 'Guest',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('student');

  const userName = role === 'admin' ? 'Admin User' : role === 'student' ? 'Carlos Méndez' : 'Guest';

  return (
    <AuthContext.Provider value={{ role, setRole, userName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
