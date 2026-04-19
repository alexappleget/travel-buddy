import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { IAuthContext } from "shared-types";
import { supabaseClient } from "../supabase/client";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabaseClient.auth.getUser().then(({ data: { user } }) => {
      setUser(user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = user !== null;

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabaseClient.auth.signUp({ email, password });

    if (error) {
      throw error;
    }
  };

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signUp, signOut, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
