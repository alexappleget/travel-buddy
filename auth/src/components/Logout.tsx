import { useAuth } from "../context/AuthContext";
import { LogOutIcon } from "./Icons";

export default function Logout() {
  const { signOut } = useAuth();

  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 border border-slate-600 hover:border-amber-500/50 hover:text-amber-400 hover:bg-amber-500/10 transition-all duration-200 hover:cursor-pointer"
      onClick={signOut}
    >
      <LogOutIcon className="w-4 h-4" />
      Sign Out
    </button>
  );
}
