
"use client";

import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';

// Bạn có thể thay đổi mật khẩu tại đây
const ADMIN_PASSWORD = "admin123";
const STORAGE_KEY = 'adminUser';

export interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      }
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    setLoading(false);
  }, []);

  const login = (name: string, email: string, password: string) => {
    if (name.trim() && email.trim() && password === ADMIN_PASSWORD) {
      const nextUser: User = { name: name.trim(), email: email.trim() };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
      } catch (error) {
        console.error("Could not access localStorage", error);
      }
      setUser(nextUser);
      return true;
    }
    return false;
  };

  const logout = () => {
     try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Could not access localStorage", error);
      }
    setUser(null);
  };

  const value = {
    isAuthenticated: user !== null,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
