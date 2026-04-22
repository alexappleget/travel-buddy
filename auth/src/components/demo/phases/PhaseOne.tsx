import {
  CalendarIcon,
  MapPinIcon,
  PlaneIcon,
  PlusIcon,
  XIcon,
} from "../../Icons";

export const PhaseOne = ({
  phase,
  typedLocation,
  showDates,
  interests,
  typedInterest,
  isTypingInterest,
  showStartButton,
}: {
  phase: number;
  typedLocation: string;
  showDates: boolean;
  interests: string[];
  typedInterest: string;
  isTypingInterest: boolean;
  showStartButton: boolean;
}) => {
  const location = "Tokyo, Japan";

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pt-12 ${
        phase === 1
          ? "opacity-100 scale-100"
          : phase === 0
            ? "opacity-0 scale-95"
            : "opacity-0 scale-105 pointer-events-none"
      }`}
    >
      <div className="w-[90%] max-w-sm bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-2xl">
        <h3 className="text-white text-base font-semibold mb-5 flex items-center gap-2">
          <PlaneIcon className="w-4 h-4 text-amber-400" />
          Start New Vacation
        </h3>

        {/* Location input */}
        <div className="mb-4">
          <label className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 block">
            Destination
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400" />
            <div className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-9 py-2.5 text-white text-sm min-h-10 flex items-center">
              {typedLocation}
              {phase === 1 && typedLocation.length < location.length && (
                <span className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        {/* Dates */}
        <div
          className={`mb-4 transition-all duration-500 ${showDates ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          <label className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 block">
            Dates
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-700/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Mar 15, 2026</span>
            </div>
            <div className="flex-1 bg-slate-700/50 border border-white/10 rounded-lg px-3 py-2.5 text-white text-xs flex items-center gap-2">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Mar 22, 2026</span>
            </div>
          </div>
        </div>

        {/* Interests - Typing to create tags */}
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
                <span className="text-white/30 text-xs">
                  Type an interest...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Start button */}
        <button
          className={`w-full py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-500 ${
            showStartButton
              ? "bg-linear-to-r from-amber-500 to-orange-500 scale-100 opacity-100 shadow-lg shadow-amber-500/25"
              : "bg-slate-600 scale-95 opacity-50"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            Start My Trip
            <PlaneIcon
              className={`w-4 h-4 transition-transform duration-300 ${showStartButton ? "translate-x-1 -translate-y-0.5" : ""}`}
            />
          </span>
        </button>
      </div>
    </div>
  );
};
