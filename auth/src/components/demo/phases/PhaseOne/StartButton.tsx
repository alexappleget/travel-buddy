import { PlaneIcon } from "../../../icons/Icons";

export const StartButton = ({
  showStartButton,
}: {
  showStartButton: boolean;
}) => {
  return (
    <button
      className={`w-full py-2.5 rounded-xl font-medium text-white text-sm transition-all duration-500 ${
        showStartButton
          ? "bg-linear-to-r from-amber-500 to-orange-500 scale-100 opacity-100 shadow-lg shadow-amber-500/25"
          : "bg-slate-600 scale-95 opacity-50"
      }`}
    >
      <span className="flex items-center justify-center gap-2">
        Start My Trip
        <PlaneIcon
          className={`w-4 h-4 transition-transform duration-300 ${showStartButton ? "translate-x-1 -translate-y-0.5" : ""}`}
        />
      </span>
    </button>
  );
};
