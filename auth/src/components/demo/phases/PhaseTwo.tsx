import { BookmarkIcon, MapPinIcon, StarIcon } from "../../Icons";
import { places } from "../places";

const interestsList = ["Pokemon", "Nintendo", "Anime"];

export const PhaseTwo = ({
  savedPlaces,
  highlightedPlace,
  activeFilter,
  phase,
}: {
  savedPlaces: number[];
  highlightedPlace: number | null;
  activeFilter: string;
  phase: number;
}) => {
  const filteredPlaces =
    activeFilter === "All"
      ? places
      : places.filter((place) => place.interest === activeFilter);

  return (
    <div
      className={`absolute inset-0 pt-14 pb-4 px-3 transition-all duration-700 ${
        phase === 2
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="h-full flex gap-2">
        {/* Left: Map */}
        <div className="w-[55%] bg-slate-800/50 rounded-xl border border-white/10 relative overflow-hidden">
          {/* Fake map background */}
          <div className="absolute inset-0 opacity-20">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              preserveAspectRatio="none"
            >
              <path
                d="M10,20 Q30,10 50,25 T90,20"
                stroke="rgba(255,255,255,0.3)"
                fill="none"
                strokeWidth="0.3"
              />
              <path
                d="M5,40 Q25,50 45,35 T95,45"
                stroke="rgba(255,255,255,0.2)"
                fill="none"
                strokeWidth="0.3"
              />
              <path
                d="M15,60 Q35,70 55,55 T85,65"
                stroke="rgba(255,255,255,0.3)"
                fill="none"
                strokeWidth="0.3"
              />
              <path
                d="M10,80 Q30,90 50,75 T90,85"
                stroke="rgba(255,255,255,0.2)"
                fill="none"
                strokeWidth="0.3"
              />
              <line
                x1="30"
                y1="20"
                x2="70"
                y2="80"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
              <line
                x1="20"
                y1="50"
                x2="80"
                y2="40"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Map label */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/80 rounded text-[10px] text-white/60">
            Tokyo, Japan
          </div>

          {/* Map pins for filtered places */}
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className={`absolute transition-all duration-500 ${
                savedPlaces.includes(place.id) || highlightedPlace === place.id
                  ? "opacity-100 scale-100"
                  : "opacity-40 scale-75"
              }`}
              style={{
                left: `${place.x}%`,
                top: `${place.y}%`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className="relative">
                <MapPinIcon
                  className={`w-6 h-6 drop-shadow-lg transition-colors ${
                    savedPlaces.includes(place.id)
                      ? "text-green-400"
                      : highlightedPlace === place.id
                        ? "text-amber-400"
                        : "text-white/50"
                  }`}
                />
                {highlightedPlace === place.id && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-400/30 rounded-full animate-ping" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Places list */}
        <div className="w-[45%] bg-slate-800/50 rounded-xl border border-white/10 flex flex-col overflow-hidden">
          {/* Filter tabs */}
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

          {/* Places list */}
          <div className="flex-1 overflow-hidden p-2 space-y-2">
            {filteredPlaces.slice(0, 4).map((place) => (
              <div
                key={place.id}
                className={`p-2 rounded-lg border transition-all duration-300 ${
                  highlightedPlace === place.id
                    ? "bg-amber-400/20 border-amber-400/50 scale-[1.02]"
                    : savedPlaces.includes(place.id)
                      ? "bg-green-400/10 border-green-400/30"
                      : "bg-slate-700/30 border-white/5"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="w-10 h-10 rounded-lg bg-slate-600/50 flex items-center justify-center text-lg shrink-0">
                    {place.img}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-[11px] font-medium truncate">
                      {place.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarIcon className="w-3 h-3 text-amber-400" />
                      <span className="text-white/60 text-[10px]">
                        {place.rating}
                      </span>
                      <span className="text-white/30 text-[10px]">
                        • {place.interest}
                      </span>
                    </div>
                  </div>
                  <button
                    className={`p-1.5 rounded-lg transition-all ${
                      savedPlaces.includes(place.id)
                        ? "bg-green-400/20 text-green-400"
                        : "bg-slate-600/50 text-white/40 hover:text-white"
                    }`}
                  >
                    <BookmarkIcon
                      className="w-3.5 h-3.5"
                      filled={savedPlaces.includes(place.id)}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Saved count */}
          <div className="p-2 border-t border-white/10">
            <div className="text-[10px] text-white/50 text-center">
              {savedPlaces.length} places saved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
