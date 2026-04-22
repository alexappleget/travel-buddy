declare module "*.css";

declare module "federation_auth/components" {
  export const SignInForm: React.ComponentType;
  export const SignUpForm: React.ComponentType;
  export const Logout: React.ComponentType;
  export const AuthProvider: ({
    children,
  }: {
    children: React.ReactNode;
  }) => React.JSX.Element;
  export const useAuth: () => import("shared-types").IAuthContext;
}

declare module "federation_dashboard/components" {
  export const Dashboard: React.ComponentType;
}
