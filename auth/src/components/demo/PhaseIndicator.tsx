export const PhaseIndicator = ({ phase }: { phase: number }) => {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
      {[1, 2, 3].map((p) => (
        <div
          key={p}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            phase === p ? "bg-amber-400 w-6" : "bg-white/20 w-1.5"
          }`}
        />
      ))}
    </div>
  );
};
