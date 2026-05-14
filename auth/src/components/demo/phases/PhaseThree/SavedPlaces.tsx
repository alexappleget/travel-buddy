import { places } from "../../places";

export const SavedPlaces = ({
  savedPlaces,
  itineraryItems,
  draggingPlace,
}: {
  savedPlaces: number[];
  itineraryItems: {
    day: number;
    placeId: number;
  }[];
  draggingPlace: number | null;
}) => {
  return (
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
  );
};
