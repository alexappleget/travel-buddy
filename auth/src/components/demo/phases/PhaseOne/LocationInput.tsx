import { MapPinIcon } from "../../../icons/Icons";

export const LocationInput = ({
  typedLocation,
  phase,
  location,
}: {
  typedLocation: string;
  phase: number;
  location: string;
}) => {
  return (
    <div className="mb-4">
      <label className="text-white/50 text-[10px] uppercase tracking-wider mb-1.5 block">
        Destination
      </label>
      <div className="relative">
        <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-400" />
        <div className="w-full bg-slate-700/50 border border-white/10 rounded-lg px-9 py-2.5 text-white text-sm min-h-10 flex items-center">
          {typedLocation}
          {phase === 1 && typedLocation.length < location.length && (
            <span className="inline-block w-0.5 h-4 bg-amber-400 ml-0.5 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};
