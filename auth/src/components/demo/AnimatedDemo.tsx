import { useEffect, useState } from "react";
import { DemoHeader } from "./DemoHeader";
import { FloatingParticles } from "./FloatingParticles";
import { BackgroundGrid } from "./BackgroundGrid";
import { PhaseIndicator } from "./PhaseIndicator";
import { PhaseOne } from "./phases/PhaseOne";
import { PhaseTwo } from "./phases/PhaseTwo";
import { PhaseThree } from "./phases/PhaseThree";

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
    const timeouts: number[] = [];

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

      <PhaseOne
        phase={phase}
        typedLocation={typedLocation}
        showDates={showDates}
        interests={interests}
        typedInterest={typedInterest}
        isTypingInterest={isTypingInterest}
        showStartButton={showStartButton}
      />

      <PhaseTwo
        savedPlaces={savedPlaces}
        activeFilter={activeFilter}
        highlightedPlace={highlightedPlace}
        phase={phase}
      />

      <PhaseThree
        showRoutes={showRoutes}
        savedPlaces={savedPlaces}
        phase={phase}
        itineraryItems={itineraryItems}
        draggingPlace={draggingPlace}
      />

      {/* Phase indicator */}
      <PhaseIndicator phase={phase} />
    </div>
  );
};
