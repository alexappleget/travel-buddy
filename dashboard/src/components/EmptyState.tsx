import { PlaneIcon, PlusIcon } from "./Icons";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6">
        <PlaneIcon className="w-10 h-10 text-amber-400" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">No trips yet</h2>
      <p className="text-slate-400 text-center mb-6 max-w-sm">
        Start planning your next adventure! Create your first trip and discover
        amazing places to visit.
      </p>
      <button className="relative px-6 py-3 rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] hover:cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Start New Trip
        </span>
      </button>
    </div>
  );
};
