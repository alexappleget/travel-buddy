import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function SignUpForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await signUp({ email, password });
    } catch (error) {
      setError("Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
          />
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="border-2 border-black hover:cursor-pointer px-8 py-2 rounded-full hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/signin" className="text-black underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
