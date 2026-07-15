
import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'Super Admin' | 'Admin' | 'Compliance Manager' | 'Employee' | 'Client' | 'Vendor' | 'Qualifier' | 'Sales';

interface RoleContextType {
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (status: boolean) => void;
  logout: () => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem('iqs_role');
    return (saved as Role) || 'Admin';
  });
  
  const [isAuthenticated, setIsAuthState] = useState<boolean>(() => {
    return localStorage.getItem('iqs_auth') === 'true';
  });

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('iqs_role', newRole);
  };

  const setIsAuthenticated = (status: boolean) => {
    setIsAuthState(status);
    if (status) {
      localStorage.setItem('iqs_auth', 'true');
    } else {
      localStorage.removeItem('iqs_auth');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('iqs_auth');
    localStorage.removeItem('iqs_role');
  };

  return (
    <RoleContext.Provider value={{ role, setRole, isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
