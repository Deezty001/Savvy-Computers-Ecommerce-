'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem('savvy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login logic
    const mockUser = {
      id: 'usr_1',
      email,
      firstName: 'Adam',
      lastName: 'Karim'
    };
    setUser(mockUser);
    localStorage.setItem('savvy_user', JSON.stringify(mockUser));
    router.push('/account/dashboard');
  };

  const register = async (data: any) => {
    // Mock register logic
    const mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    };
    setUser(mockUser);
    localStorage.setItem('savvy_user', JSON.stringify(mockUser));
    router.push('/account/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('savvy_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
