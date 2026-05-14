import { PlaneIcon, PlusIcon, XIcon } from "../../../icons/Icons";
import { Dates } from "./Dates";
import { Interests } from "./Interests";
import { LocationInput } from "./LocationInput";
import { StartButton } from "./StartButton";

export const PhaseOne = ({
  phase,
  typedLocation,
  showDates,
  interests,
  typedInterest,
  isTypingInterest,
  showStartButton,
}: {
  phase: number;
  typedLocation: string;
  showDates: boolean;
  interests: string[];
  typedInterest: string;
  isTypingInterest: boolean;
  showStartButton: boolean;
}) => {
  const location = "Tokyo, Japan";

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-700 pt-12 pb-10 ${
        phase === 1
          ? "opacity-100 scale-100"
          : phase === 0
            ? "opacity-0 scale-95"
            : "opacity-0 scale-105 pointer-events-none"
      }`}
    >
      <div className="w-[90%] max-w-sm bg-slate-800/90 backdrop-blur-xl rounded-2xl border border-white/10 p-5 shadow-2xl">
        <h3 className="text-white text-base font-semibold mb-5 flex items-center gap-2">
          <PlaneIcon className="w-4 h-4 text-amber-400" />
          Start New Vacation
        </h3>

        <LocationInput
          typedLocation={typedLocation}
          phase={phase}
          location={location}
        />

        <Dates showDates={showDates} />

        <Interests
          showDates={showDates}
          interests={interests}
          typedInterest={typedInterest}
          isTypingInterest={isTypingInterest}
        />

        {/* Start button */}
        <StartButton showStartButton={showStartButton} />
      </div>
    </div>
  );
};
