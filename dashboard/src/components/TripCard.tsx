import { formatDateRange } from "../functions/formatDateRange";
import { BookmarkIcon, CalendarIcon, MapPinIcon } from "./Icons";

export const TripCard = ({
  trip,
}: {
  trip: {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    savedPlaces: number;
    image: string;
  };
}) => {
  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-40 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.destination}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-amber-400" />
            {trip.destination}
          </h3>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
          <CalendarIcon className="w-4 h-4" />
          <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <BookmarkIcon className="w-4 h-4" />
            <span>{trip.savedPlaces} places saved</span>
          </div>

          <button className="px-3 py-1.5 text-sm font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 rounded-lg transition-colors hover:cursor-pointer">
            View Trip
          </button>
        </div>
      </div>
    </div>
  );
};
