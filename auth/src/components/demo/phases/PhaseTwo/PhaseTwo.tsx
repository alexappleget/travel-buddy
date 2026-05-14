import { places } from "../../places";
import { TokyoMapBackground } from "../../TokyoMapBackground";
import { FilterTabs } from "./FilterTabs";
import { MapPins } from "./MapPins";
import { PlacesList } from "./PlacesList";

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
      className={`absolute inset-0 pt-14 pb-10 px-3 transition-all duration-700 ${
        phase === 2
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="h-full flex gap-2">
        {/* Left: Map */}
        <div className="w-[55%] rounded-xl border border-slate-300 relative overflow-hidden shadow-lg">
          <TokyoMapBackground zoom={1} />

          {/* Google Maps style location badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1.5 bg-white rounded-md shadow-md flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[10px] text-gray-700 font-medium">
              Tokyo, Japan
            </span>
          </div>

          {filteredPlaces.map((place) => (
            <MapPins
              place={place}
              savedPlaces={savedPlaces}
              highlightedPlace={highlightedPlace}
            />
          ))}
        </div>

        {/* Right: Places list */}
        <div className="w-[45%] bg-slate-800/50 rounded-xl border border-white/10 flex flex-col overflow-hidden">
          {/* Filter tabs */}
          <FilterTabs
            interestsList={interestsList}
            activeFilter={activeFilter}
          />

          <div className="flex-1 overflow-hidden p-2 space-y-2">
            {filteredPlaces.slice(0, 4).map((place) => (
              <PlacesList
                place={place}
                highlightedPlace={highlightedPlace}
                savedPlaces={savedPlaces}
              />
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
