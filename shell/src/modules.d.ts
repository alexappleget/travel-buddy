declare module "*.css";
import { IAuthContext } from "@travel-buddy/types";

declare module "federation_auth/components" {
  export const SignInForm: React.ComponentType;
  export const Logout: React.ComponentType;
  export const AuthProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => React.JSX.Element;
  export const useAuth: () => IAuthContext;
}
