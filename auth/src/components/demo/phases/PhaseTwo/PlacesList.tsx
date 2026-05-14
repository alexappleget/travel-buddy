import { BookmarkIcon, StarIcon } from "../../../icons/Icons";
import { IPlace } from "./types";

export const PlacesList = ({
  place,
  highlightedPlace,
  savedPlaces,
}: {
  place: IPlace;
  highlightedPlace: number | null;
  savedPlaces: number[];
}) => {
  return (
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
            <span className="text-white/60 text-[10px]">{place.rating}</span>
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
  );
};
