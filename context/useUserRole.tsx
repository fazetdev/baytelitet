'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Role = 'buyer' | 'investor' | 'developer' | 'agent' | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side only
  useEffect(() => {
    setIsClient(true);
    const savedRole = localStorage.getItem('userRole') as Role | null;
    if (savedRole) setRoleState(savedRole);
  }, []);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    if (isClient) {
      if (newRole) {
        localStorage.setItem('userRole', newRole);
      } else {
        localStorage.removeItem('userRole');
      }
    }
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useUserRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useUserRole must be used within RoleProvider');
  return context;
};
