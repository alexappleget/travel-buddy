import { useEffect, useState } from "react";
import { DemoHeader } from "./DemoHeader";
import { FloatingParticles } from "./FloatingParticles";
import { BackgroundGrid } from "./BackgroundGrid";
import {
  BookmarkIcon,
  CalendarIcon,
  MapPinIcon,
  PlaneIcon,
  PlusIcon,
  StarIcon,
  XIcon,
} from "../Icons";

export const AnimatedDemo = () => {
  const [phase, setPhase] = useState(0);

  // Phase 1 states
  const [typedLocation, setTypedLocation] = useState("");
  const [showDates, setShowDates] = useState(false);
  const [typedInterest, setTypedInterest] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [showStartButton, setShowStartButton] = useState(false);
  const [isTypingInterest, setIsTypingInterest] = useState(false);

  // Phase 2 states
  const [activeFilter, setActiveFilter] = useState("All");
  const [savedPlaces, setSavedPlaces] = useState<number[]>([]);
  const [highlightedPlace, setHighlightedPlace] = useState<number | null>(null);

  // Phase 3 states
  const [itineraryItems, setItineraryItems] = useState<
    { day: number; placeId: number }[]
  >([]);
  const [draggingPlace, setDraggingPlace] = useState<number | null>(null);
  const [showRoutes, setShowRoutes] = useState(false);

  const location = "Tokyo, Japan";
  const interestsList = ["Pokemon", "Nintendo", "Anime"];

  const places = [
    {
      id: 1,
      name: "Pokemon Center Mega Tokyo",
      interest: "Pokemon",
      rating: 4.8,
      x: 70,
      y: 35,
      img: "🎮",
    },
    {
      id: 2,
      name: "Pokemon Cafe",
      interest: "Pokemon",
      rating: 4.7,
      x: 45,
      y: 45,
      img: "☕",
    },
    {
      id: 3,
      name: "Nintendo Tokyo",
      interest: "Nintendo",
      rating: 4.9,
      x: 55,
      y: 55,
      img: "🕹️",
    },
    {
      id: 4,
      name: "Akihabara District",
      interest: "Anime",
      rating: 4.6,
      x: 65,
      y: 65,
      img: "🏙️",
    },
    {
      id: 5,
      name: "Ghibli Museum",
      interest: "Anime",
      rating: 4.9,
      x: 30,
      y: 40,
      img: "🎬",
    },
    {
      id: 6,
      name: "Nintendo World Store",
      interest: "Nintendo",
      rating: 4.7,
      x: 40,
      y: 70,
      img: "⭐",
    },
  ];

  const filteredPlaces =
    activeFilter === "All"
      ? places
      : places.filter((p) => p.interest === activeFilter);

  // Reset function
  const resetAnimation = () => {
    setPhase(0);
    setTypedLocation("");
    setShowDates(false);
    setTypedInterest("");
    setInterests([]);
    setShowStartButton(false);
    setIsTypingInterest(false);
    setActiveFilter("All");
    setSavedPlaces([]);
    setHighlightedPlace(null);
    setItineraryItems([]);
    setDraggingPlace(null);
    setShowRoutes(false);
  };

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    const schedule = (delay: number, action: () => void) => {
      timeouts.push(setTimeout(action, delay));
    };

    // Phase 1: Trip Creation
    schedule(500, () => setPhase(1));

    // Type location
    location.split("").forEach((_, i) => {
      schedule(700 + i * 60, () => setTypedLocation(location.slice(0, i + 1)));
    });

    // Show dates
    schedule(1800, () => setShowDates(true));

    // Type first interest: "Pokemon"
    schedule(2500, () => setIsTypingInterest(true));
    "Pokemon".split("").forEach((_, i) => {
      schedule(2600 + i * 80, () =>
        setTypedInterest("Pokemon".slice(0, i + 1)),
      );
    });
    schedule(3300, () => {
      setInterests(["Pokemon"]);
      setTypedInterest("");
    });

    // Type second interest: "Nintendo"
    "Nintendo".split("").forEach((_, i) => {
      schedule(3500 + i * 80, () =>
        setTypedInterest("Nintendo".slice(0, i + 1)),
      );
    });
    schedule(4300, () => {
      setInterests(["Pokemon", "Nintendo"]);
      setTypedInterest("");
    });

    // Type third interest: "Anime"
    "Anime".split("").forEach((_, i) => {
      schedule(4500 + i * 80, () => setTypedInterest("Anime".slice(0, i + 1)));
    });
    schedule(5000, () => {
      setInterests(["Pokemon", "Nintendo", "Anime"]);
      setTypedInterest("");
      setIsTypingInterest(false);
    });

    // Show start button and click
    schedule(5500, () => setShowStartButton(true));
    schedule(6500, () => setPhase(2));

    // Phase 2: Exploration
    schedule(7000, () => setActiveFilter("Pokemon"));
    schedule(7800, () => setHighlightedPlace(1));
    schedule(8300, () => {
      setSavedPlaces([1]);
      setHighlightedPlace(null);
    });
    schedule(8800, () => setHighlightedPlace(2));
    schedule(9300, () => {
      setSavedPlaces([1, 2]);
      setHighlightedPlace(null);
    });
    schedule(9800, () => setActiveFilter("Nintendo"));
    schedule(10300, () => setHighlightedPlace(3));
    schedule(10800, () => {
      setSavedPlaces([1, 2, 3]);
      setHighlightedPlace(null);
    });
    schedule(11300, () => setActiveFilter("Anime"));
    schedule(11800, () => setHighlightedPlace(4));
    schedule(12300, () => {
      setSavedPlaces([1, 2, 3, 4]);
      setHighlightedPlace(null);
    });

    // Phase 3: Itinerary
    schedule(13000, () => setPhase(3));
    schedule(13800, () => setDraggingPlace(1));
    schedule(14400, () => {
      setItineraryItems([{ day: 1, placeId: 1 }]);
      setDraggingPlace(null);
    });
    schedule(14900, () => setDraggingPlace(2));
    schedule(15500, () => {
      setItineraryItems([
        { day: 1, placeId: 1 },
        { day: 1, placeId: 2 },
      ]);
      setDraggingPlace(null);
    });
    schedule(16000, () => setDraggingPlace(3));
    schedule(16600, () => {
      setItineraryItems([
        { day: 1, placeId: 1 },
        { day: 1, placeId: 2 },
        { day: 2, placeId: 3 },
      ]);
      setDraggingPlace(null);
    });
    schedule(17200, () => setShowRoutes(true));

    // Reset and loop
    schedule(20000, resetAnimation);

    return () => timeouts.forEach(clearTimeout);
  }, [phase === 0 && typedLocation === ""]);

  return (
    <div className="relative w-full h-full bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <BackgroundGrid />
      <FloatingParticles />
      <DemoHeader />

      {/* ==================== PHASE 1: Trip Creation ==================== */}
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
              <div className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-9 py-2.5 text-white text-sm min-h-[40px] flex items-center">
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
            <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
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
                {!isTypingInterest &&
                  !typedInterest &&
                  interests.length < 3 && (
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
                ? "bg-gradient-to-r from-amber-500 to-orange-500 scale-100 opacity-100 shadow-lg shadow-amber-500/25"
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

      {/* ==================== PHASE 2: Exploration ==================== */}
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
                  savedPlaces.includes(place.id) ||
                  highlightedPlace === place.id
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
                    <div className="w-10 h-10 rounded-lg bg-slate-600/50 flex items-center justify-center text-lg flex-shrink-0">
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

      {/* ==================== PHASE 3: Itinerary ==================== */}
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
                const place = places.find((p) => p.id === id);
                if (!place) return null;
                const isUsed = itineraryItems.some(
                  (item) => item.placeId === id,
                );
                const isDragging = draggingPlace === id;

                return (
                  <div
                    key={id}
                    className={`flex-shrink-0 p-2 rounded-lg border transition-all duration-300 ${
                      isDragging
                        ? "bg-amber-400/30 border-amber-400/50 scale-95 opacity-50"
                        : isUsed
                          ? "bg-slate-700/30 border-white/5 opacity-40"
                          : "bg-slate-700/50 border-white/10"
                    }`}
                    style={{
                      width: "100px",
                      animation: isDragging
                        ? "dragOut 0.5s ease-out"
                        : undefined,
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
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white/20">
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

      {/* Phase indicator */}
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

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes popIn {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          70% { transform: translate(-50%, -50%) scale(1.2); }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes tagAppear {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(4px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes slideIn {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeSlideUp {
          0% { opacity: 0; transform: translateX(-50%) translateY(8px); }
          100% { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes drawRoute {
          0% { stroke-dashoffset: inherit; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes drawLine {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes dragOut {
          0% { transform: scale(1); }
          50% { transform: scale(0.9) translateY(-10px); }
          100% { transform: scale(0.8); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
};
