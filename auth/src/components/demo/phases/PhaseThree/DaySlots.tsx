import { places } from "../../places";

export const DaySlots = ({
  itineraryItems,
  draggingPlace,
}: {
  itineraryItems: {
    day: number;
    placeId: number;
  }[];
  draggingPlace: number | null;
}) => {
  return (
    <div className="w-[45%] bg-slate-800/50 rounded-xl border border-white/10 p-2 overflow-auto">
      {[1, 2].map((day) => {
        const dayItems = itineraryItems.filter((item) => item.day === day);
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
  );
};
