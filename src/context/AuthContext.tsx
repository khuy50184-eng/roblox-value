
"use client";

import React, { createContext, useState, useEffect, type ReactNode, useContext } from 'react';

// Bạn có thể thay đổi mật khẩu tại đây
const ADMIN_PASSWORD = "admin123";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This effect runs only on the client, after the initial render.
    try {
      const storedAuth = localStorage.getItem('isAuthenticated');
      if (storedAuth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (error) {
        console.error("Could not access localStorage", error);
    }
    setLoading(false);
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      try {
        localStorage.setItem('isAuthenticated', 'true');
      } catch (error) {
        console.error("Could not access localStorage", error);
      }
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
     try {
        localStorage.removeItem('isAuthenticated');
      } catch (error) {
        console.error("Could not access localStorage", error);
      }
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
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
