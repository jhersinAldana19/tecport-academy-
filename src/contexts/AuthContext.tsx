import React, { createContext, useContext, useEffect, useState } from 'react';
import { TEMP_ACCESS } from '@/config/tempAccess';
import {
  findStaffUserByCredentials,
  staffUsers,
  type StaffUser,
} from '@/data/staffUsers';

export type UserRole = 'guest' | 'student' | 'admin' | 'tecport_staff';

const SESSION_KEY = 'tecport-academy-staff-session';

interface AuthContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  userName: string;
  user: StaffUser | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  role: TEMP_ACCESS.defaultRole,
  setRole: () => {},
  userName: 'Tecport Staff',
  user: null,
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

function readStoredUser(): StaffUser | null {
  try {
    const username = localStorage.getItem(SESSION_KEY);
    if (!username) return null;
    return staffUsers.find(user => user.username === username) ?? null;
  } catch {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StaffUser | null>(null);
  const [role, setRoleState] = useState<UserRole>(TEMP_ACCESS.defaultRole);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredUser();
    if (stored) {
      setUser(stored);
      setRoleState('tecport_staff');
    }
    setReady(true);
  }, []);

  const setRole = (nextRole: UserRole) => {
    if (nextRole === 'admin' && !TEMP_ACCESS.adminEnabled) return;
    if (user) return;
    setRoleState(nextRole);
  };

  const login = (username: string, password: string): boolean => {
    const found = findStaffUserByCredentials(username, password);
    if (!found) return false;
    setUser(found);
    setRoleState('tecport_staff');
    localStorage.setItem(SESSION_KEY, found.username);
    return true;
  };

  const logout = () => {
    setUser(null);
    setRoleState(TEMP_ACCESS.defaultRole);
    localStorage.removeItem(SESSION_KEY);
  };

  const userName = user?.fullName ?? 'Tecport Staff';

  if (!ready) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        role: user ? 'tecport_staff' : role,
        setRole,
        userName,
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
