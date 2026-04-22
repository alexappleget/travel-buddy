import { places } from "../places";

export const PhaseThree = ({
  showRoutes,
  savedPlaces,
  phase,
  itineraryItems,
  draggingPlace,
}: {
  showRoutes: boolean;
  savedPlaces: number[];
  phase: number;
  itineraryItems: {
    day: number;
    placeId: number;
  }[];
  draggingPlace: number | null;
}) => {
  return (
    <div
      className={`absolute inset-0 pt-14 pb-4 px-3 transition-all duration-700 ${
        phase === 3
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="h-full flex flex-col gap-2">
        {/* Top: Saved places panel */}
        <div className="bg-slate-800/50 rounded-xl border border-white/10 p-2">
          <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">
            Saved Places
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {savedPlaces.map((id) => {
              const place = places.find((place) => place.id === id);
              if (!place) return null;
              const isUsed = itineraryItems.some((item) => item.placeId === id);
              const isDragging = draggingPlace === id;

              return (
                <div
                  key={id}
                  className={`shrink-0 p-2 rounded-lg border transition-all duration-300 ${
                    isDragging
                      ? "bg-amber-400/30 border-amber-400/50 scale-95 opacity-50"
                      : isUsed
                        ? "bg-slate-700/30 border-white/5 opacity-40"
                        : "bg-slate-700/50 border-white/10"
                  }`}
                  style={{
                    width: "100px",
                    animation: isDragging ? "dragOut 0.5s ease-out" : undefined,
                  }}
                >
                  <div className="text-lg mb-1">{place.img}</div>
                  <div className="text-white text-[10px] font-medium truncate">
                    {place.name.split(" ").slice(0, 2).join(" ")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom: Itinerary + Map */}
        <div className="flex-1 flex gap-2 min-h-0">
          {/* Left: Day slots */}
          <div className="w-[45%] bg-slate-800/50 rounded-xl border border-white/10 p-2 overflow-auto">
            {[1, 2].map((day) => {
              const dayItems = itineraryItems.filter(
                (item) => item.day === day,
              );
              return (
                <div key={day} className="mb-3">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider mb-2">
                    Day {day} - Mar {14 + day}, 2026
                  </div>
                  <div className="space-y-1.5">
                    {dayItems.map((item, idx) => {
                      const place = places.find((p) => p.id === item.placeId);
                      if (!place) return null;
                      return (
                        <div
                          key={item.placeId}
                          className="p-2 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center gap-2"
                          style={{ animation: "slideIn 0.4s ease-out" }}
                        >
                          <div className="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[10px] font-bold text-slate-900">
                            {idx + 1}
                          </div>
                          <div className="text-lg">{place.img}</div>
                          <div className="text-white text-[10px] font-medium truncate">
                            {place.name}
                          </div>
                        </div>
                      );
                    })}
                    {dayItems.length < 2 && (
                      <div className="p-2 rounded-lg border-2 border-dashed border-white/10 text-white/30 text-[10px] text-center">
                        {draggingPlace && dayItems.length === 0
                          ? "Drop here"
                          : "Add places..."}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Map with routes */}
          <div className="w-[55%] bg-slate-800/50 rounded-xl border border-white/10 relative overflow-hidden">
            {/* Map background */}
            <div className="absolute inset-0 opacity-20">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M10,30 Q30,20 50,35 T90,30"
                  stroke="rgba(255,255,255,0.3)"
                  fill="none"
                  strokeWidth="0.5"
                />
                <path
                  d="M15,50 Q35,60 55,45 T85,55"
                  stroke="rgba(255,255,255,0.3)"
                  fill="none"
                  strokeWidth="0.5"
                />
                <path
                  d="M10,70 Q30,80 50,65 T90,75"
                  stroke="rgba(255,255,255,0.3)"
                  fill="none"
                  strokeWidth="0.5"
                />
              </svg>
            </div>

            {/* Route lines with distance labels */}
            {showRoutes && itineraryItems.length >= 2 && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="routeGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#ea580c" />
                  </linearGradient>
                  <filter
                    id="routeGlow"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur stdDeviation="0.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {itineraryItems.slice(0, -1).map((item, idx) => {
                  const fromPlace = places.find((p) => p.id === item.placeId);
                  const toPlace = places.find(
                    (p) => p.id === itineraryItems[idx + 1]?.placeId,
                  );
                  if (!fromPlace || !toPlace) return null;

                  // Calculate actual line length for proper dash animation
                  const dx = toPlace.x - fromPlace.x;
                  const dy = toPlace.y - fromPlace.y;
                  const lineLength = Math.sqrt(dx * dx + dy * dy);

                  // Midpoint for distance label
                  const midX = (fromPlace.x + toPlace.x) / 2;
                  const midY = (fromPlace.y + toPlace.y) / 2;

                  // Fixed distance values for consistency
                  const distances = [1.2, 3.5, 2.1];

                  return (
                    <g key={idx}>
                      {/* Background glow line */}
                      <line
                        x1={fromPlace.x}
                        y1={fromPlace.y}
                        x2={toPlace.x}
                        y2={toPlace.y}
                        stroke="#f59e0b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeOpacity="0.3"
                        filter="url(#routeGlow)"
                        strokeDasharray={lineLength}
                        strokeDashoffset={lineLength}
                        style={{
                          animation: `drawRoute ${0.6 + idx * 0.1}s ease-out forwards`,
                          animationDelay: `${idx * 0.25}s`,
                        }}
                      />
                      {/* Main route line */}
                      <line
                        x1={fromPlace.x}
                        y1={fromPlace.y}
                        x2={toPlace.x}
                        y2={toPlace.y}
                        stroke="url(#routeGrad)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeDasharray={lineLength}
                        strokeDashoffset={lineLength}
                        style={{
                          animation: `drawRoute ${0.6 + idx * 0.1}s ease-out forwards`,
                          animationDelay: `${idx * 0.25}s`,
                        }}
                      />
                      {/* Distance label at midpoint */}
                      <g
                        style={{
                          animation: `fadeIn 0.4s ease-out forwards`,
                          animationDelay: `${0.4 + idx * 0.25}s`,
                          opacity: 0,
                        }}
                      >
                        <rect
                          x={midX - 5}
                          y={midY - 2.5}
                          width="10"
                          height="5"
                          rx="1.5"
                          fill="rgba(15, 23, 42, 0.9)"
                          stroke="rgba(251, 191, 36, 0.3)"
                          strokeWidth="0.3"
                        />
                        <text
                          x={midX}
                          y={midY + 1}
                          textAnchor="middle"
                          fill="#fbbf24"
                          fontSize="2.5"
                          fontWeight="600"
                          fontFamily="system-ui, sans-serif"
                        >
                          {distances[idx]} km
                        </text>
                      </g>
                    </g>
                  );
                })}
              </svg>
            )}

            {/* Numbered pins */}
            {itineraryItems.map((item, idx) => {
              const place = places.find((p) => p.id === item.placeId);
              if (!place) return null;
              return (
                <div
                  key={item.placeId}
                  className="absolute transition-all duration-500"
                  style={{
                    left: `${place.x}%`,
                    top: `${place.y}%`,
                    transform: "translate(-50%, -50%)",
                    animation: "popIn 0.4s ease-out",
                  }}
                >
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white/20">
                    {idx + 1}
                  </div>
                </div>
              );
            })}

            {/* Total distance summary */}
            {showRoutes && itineraryItems.length >= 2 && (
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm rounded-full border border-amber-400/20 flex items-center gap-2"
                style={{
                  animation: "fadeSlideUp 0.5s ease-out forwards",
                  animationDelay: "0.8s",
                  opacity: 0,
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] text-white/80 font-medium">
                  Total: <span className="text-amber-400">4.7 km</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
