import { GlobeIcon } from "../Icons";

export const DemoHeader = () => {
  return (
    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
          <GlobeIcon className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-white/80 font-medium text-xs">Travel Buddy</span>
      </div>
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-red-400/80" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/80" />
        <div className="w-2 h-2 rounded-full bg-green-400/80" />
      </div>
    </div>
  );
};
