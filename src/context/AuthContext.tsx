'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinedDate: string;
}

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: OrderItem[];
}

interface AuthContextType {
  user: User | null;
  orders: Order[];
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  cancelOrder: (id: string) => void;
  addOrder: (order: Order) => void;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'EFZ-2025-001',
    date: '2025-04-28',
    status: 'Delivered',
    total: 42500,
    items: [{ name: 'RTX 4070 Ti SUPER', qty: 1, price: 42500 }],
  },
  {
    id: 'EFZ-2025-002',
    date: '2025-05-01',
    status: 'Shipped',
    total: 24500,
    items: [{ name: 'Ryzen 7 7800X3D', qty: 1, price: 24500 }],
  },
  {
    id: 'EFZ-2025-003',
    date: '2025-05-03',
    status: 'Processing',
    total: 19700,
    items: [
      { name: 'FURY Beast DDR5 16GB', qty: 2, price: 4200 },
      { name: 'WD Black SN850X 2TB', qty: 1, price: 9800 },
      { name: 'C12 Infinity Mirror 3-Pack', qty: 1, price: 1500 },
    ],
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('efz-user');
      if (saved) setUser(JSON.parse(saved));
    } catch {}
  }, []);

  const login = useCallback(async (
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 900));
    if (!email || !password) return { success: false, error: 'Please fill in all fields.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const u: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '',
      address: '',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(u);
    localStorage.setItem('efz-user', JSON.stringify(u));
    return { success: true };
  }, []);

  const register = useCallback(async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    await new Promise(r => setTimeout(r, 900));
    if (!name || !email || !password) return { success: false, error: 'Please fill in all fields.' };
    if (password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };
    const u: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: '',
      address: '',
      joinedDate: new Date().toISOString().split('T')[0],
    };
    setUser(u);
    localStorage.setItem('efz-user', JSON.stringify(u));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('efz-user');
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      localStorage.setItem('efz-user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const cancelOrder = useCallback((id: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'Cancelled' } : o));
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, orders, isLoggedIn: !!user, login, register, logout, updateProfile, cancelOrder, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
