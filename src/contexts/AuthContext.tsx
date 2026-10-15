import React, { createContext, useContext, useState } from 'react';
import { TEMP_ACCESS } from '@/config/tempAccess';

export type UserRole = 'guest' | 'student' | 'admin' | 'tecport_staff';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
}

const AuthContext = createContext<AuthContextType>({
  role: TEMP_ACCESS.defaultRole,
  setRole: () => {},
  userName: 'Tecport Staff',
});

const displayNameByRole: Record<UserRole, string> = {
  guest: 'Guest',
  student: 'Carlos Méndez',
  admin: 'Admin User',
  tecport_staff: 'Tecport Staff',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(TEMP_ACCESS.defaultRole);

  const setRole = (nextRole: UserRole) => {
    if (nextRole === 'admin' && !TEMP_ACCESS.adminEnabled) return;
    setRoleState(nextRole);
  };

  return (
    <AuthContext.Provider value={{ role, setRole, userName: displayNameByRole[role] }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
