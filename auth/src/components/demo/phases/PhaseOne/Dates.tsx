import { CalendarIcon } from "../../../icons/Icons";

export const Dates = ({ showDates }: { showDates: boolean }) => {
  return (
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
  );
};
