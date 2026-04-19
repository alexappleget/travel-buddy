import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const { signOut } = useAuth();

  return (
    <button
      className="border-2 border-black hover:cursor-pointer px-8 py-2 rounded-full hover:bg-black hover:text-white"
      onClick={signOut}
    >
      Sign Out
    </button>
  );
}
