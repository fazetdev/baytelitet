'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'buyer' | 'investor' | 'developer' | 'agent' | null;

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(null);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    // REMOVED: localStorage usage
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
