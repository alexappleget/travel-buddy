import { User } from "@supabase/supabase-js";

export interface IAuthContext {
  isAuthenticated: boolean | null;
  user: User | null;
  loading: boolean;
  ssignIn: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signOut: () => Promise<void>;
}
