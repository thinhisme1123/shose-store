"use client";

import { AccountService } from "@/application/product/usercase/account.usecase";
import { User } from "@/domain/product/enities/user";
import { AccountApi } from "@/infrastructure/product/account-api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accountApiRepo = new AccountApi();
  const serviceAccount = new AccountService(accountApiRepo);

  // Load user from backend using token
  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data = await res.json();

      const loadedUser: User = {
        id: data.user.id,
        fullName: `${data.user.firstName} ${data.user.lastName}`,
        email: data.user.email,
      };

      setUser(loadedUser);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await serviceAccount.login(email, password);
      localStorage.setItem("token", data.token);
      await loadUser();

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const body = await res.json();
      if (!res.ok) {
        // This throws the error to the catch block below
        throw new Error(body.message || "Registration failed");
      }

      // Immediately login after register
      return await login(data.email, data.password);
    } catch (error) {
      // DON'T return false here. Throw the error up to the component!
      console.error("Registration error:", error);
      throw error;
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
