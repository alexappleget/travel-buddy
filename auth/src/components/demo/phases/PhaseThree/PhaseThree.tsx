import { places } from "../../places";
import { TokyoMapBackground } from "../../TokyoMapBackground";
import { GoogleMapMarker } from "../../GoogleMapMarker";
import { DaySlots } from "./DaySlots";
import { RouteLines } from "./RouteLines";
import { SavedPlaces } from "./SavedPlaces";

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
      className={`absolute inset-0 pt-14 pb-10 px-3 transition-all duration-700 ${
        phase === 3
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="h-full flex flex-col gap-2">
        {/* Top: Saved places panel */}
        <SavedPlaces
          savedPlaces={savedPlaces}
          itineraryItems={itineraryItems}
          draggingPlace={draggingPlace}
        />

        {/* Bottom: Itinerary + Map */}
        <div className="flex-1 flex gap-2 min-h-0">
          {/* Left: Day slots */}
          <DaySlots
            itineraryItems={itineraryItems}
            draggingPlace={draggingPlace}
          />

          {/* Right: Map with routes */}
          <div className="w-[55%] rounded-xl border border-slate-300 relative overflow-hidden shadow-lg">
            {/* Map background with zoom effect */}
            <TokyoMapBackground zoom={1.15} />

            {/* Route lines with distance labels */}
            {showRoutes && itineraryItems.length >= 2 && (
              <RouteLines itineraryItems={itineraryItems} />
            )}

            {/* Numbered pins using Google style markers */}
            {itineraryItems.map((item, idx) => {
              const place = places.find((p) => p.id === item.placeId);
              if (!place) return null;
              return (
                <div
                  key={item.placeId}
                  className="absolute transition-all duration-500 z-10"
                  style={{
                    left: `${place.x}%`,
                    top: `${place.y}%`,
                    transform: "translate(-50%, -100%)",
                    animation: "popIn 0.4s ease-out",
                  }}
                >
                  <GoogleMapMarker
                    icon={place.icon}
                    isSaved={true}
                    label={idx + 1}
                    size="md"
                  />
                </div>
              );
            })}

            {/* Total distance summary - Google Maps style */}
            {showRoutes && itineraryItems.length >= 2 && (
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-2 bg-white rounded-lg shadow-lg flex items-center gap-2"
                style={{
                  animation: "fadeSlideUp 0.5s ease-out forwards",
                  animationDelay: "0.8s",
                  opacity: 0,
                }}
              >
                <svg
                  className="w-4 h-4 text-blue-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="text-[11px] text-gray-700 font-medium">
                  Total:{" "}
                  <span className="text-blue-600 font-semibold">4.7 km</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
