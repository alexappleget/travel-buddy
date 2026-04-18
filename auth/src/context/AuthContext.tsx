import { createContext, useContext, useEffect, useState } from "react";
import { IAuthContext } from "./authTypes";
import { User } from "@supabase/supabase-js";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, isLoading] = useState<boolean>(true);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {};
};
