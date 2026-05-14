export const FilterTabs = ({
  interestsList,
  activeFilter,
}: {
  interestsList: string[];
  activeFilter: string;
}) => {
  return (
    <div className="p-2 border-b border-white/10">
      <div className="flex gap-1 flex-wrap">
        {["All", ...interestsList].map((filter) => (
          <button
            key={filter}
            className={`px-2 py-1 rounded-full text-[10px] font-medium transition-all ${
              activeFilter === filter
                ? "bg-amber-400 text-slate-900"
                : "bg-slate-700/50 text-white/60 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};
