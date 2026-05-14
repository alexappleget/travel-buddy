import { PlusIcon, XIcon } from "../../../icons/Icons";

export const Interests = ({
  showDates,
  interests,
  typedInterest,
  isTypingInterest,
}: {
  showDates: boolean;
  interests: string[];
  typedInterest: string;
  isTypingInterest: boolean;
}) => {
  return (
    <div
      className={`mb-5 transition-all duration-500 ${showDates ? "opacity-100" : "opacity-0"}`}
    >
      <label className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 block">
        What are you interested in?
      </label>

      {/* Interest tags */}
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-7">
        {interests.map((interest, idx) => (
          <span
            key={interest}
            className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1"
            style={{
              animation:
                "tagAppear 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
              animationDelay: `${idx * 0.05}s`,
              opacity: 0,
            }}
          >
            {interest}
            <XIcon className="w-2.5 h-2.5 opacity-60" />
          </span>
        ))}
      </div>

      {/* Input for typing interests */}
      <div className="relative">
        <div className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm flex items-center gap-2">
          <PlusIcon className="w-3.5 h-3.5 text-white/30" />
          <span className="text-white/70">{typedInterest}</span>
          {isTypingInterest && (
            <span className="inline-block w-0.5 h-4 bg-amber-400 animate-pulse" />
          )}
          {!isTypingInterest && !typedInterest && interests.length < 3 && (
            <span className="text-white/30 text-xs">Type an interest...</span>
          )}
        </div>
      </div>
    </div>
  );
};
