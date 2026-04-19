import { User } from "@supabase/supabase-js";

export interface IAuthContext {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signUp: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}
