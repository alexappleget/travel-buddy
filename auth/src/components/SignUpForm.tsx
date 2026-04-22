import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { GlobeIcon, PlaneIcon } from "./Icons";
import { AnimatedDemo } from "./demo/AnimatedDemo";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { signUp } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signUp({ email, password });
    } catch (error) {
      setError("Sign up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:block lg:w-1/2 xl:w-3/5 relative">
        <AnimatedDemo />

        {/* Overlay text */}
        <div className="absolute bottom-12 left-6 right-6 text-center z-10">
          <p className="text-white/50 text-xs">
            See how easy it is to plan your next adventure
          </p>
        </div>
      </div>

      {/* Right side - Sign In Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 relative">
        <div className="w-full max-w-md px-8 py-12">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 mb-4 shadow-lg shadow-amber-500/20">
              <GlobeIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-800 mb-1">
              Create your account
            </h1>
            <p className="text-slate-500 text-sm">
              Start planning your next adventure
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none ${
                  focusedField === "email"
                    ? "border-amber-400 ring-4 ring-amber-400/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="you@example.com"
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-white border-2 rounded-xl text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none ${
                  focusedField === "password"
                    ? "border-amber-400 ring-4 ring-amber-400/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                placeholder="Enter your password"
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
                <svg
                  className="w-5 h-5 text-red-500 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full py-3.5 rounded-xl font-medium text-white overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500" />
              <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Account</span>
                    <PlaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-slate-400 text-xs uppercase tracking-wider">
              Already have an account?
            </span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Sign up link */}
          <Link
            to="/signin"
            className="block w-full py-3 rounded-xl border-2 border-slate-200 text-slate-600 text-center font-medium hover:border-amber-400 hover:text-amber-600 transition-all duration-200 hover:bg-amber-50"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
