import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { CalendarIcon, MapPinIcon, PlusIcon } from "./Icons";
import { CreateTripModalProps } from "../types/interface";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2L13.09 8.26L18 7L14.74 10.91L20 14L13.09 15.74L12 22L10.91 15.74L4 14L9.26 10.91L6 7L10.91 8.26L12 2Z" />
  </svg>
);

export const CreateTripModal = ({
  isOpen,
  onClose,
  onCreateTrip,
}: CreateTripModalProps) => {
  const [destination, setDestination] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState<string>("");
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus first input when modal opens
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
      // Reset form
      setDestination("");
      setStartDate("");
      setEndDate("");
      setInterests([]);
      setInterestInput("");
    }, 200);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const addInterest = () => {
    const trimmed = interestInput.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests((prev) => [...prev, trimmed]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  const handleInterestKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addInterest();
    } else if (
      e.key === "Backspace" &&
      !interestInput &&
      interests.length > 0
    ) {
      removeInterest(interests[interests.length - 1]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (destination && startDate && endDate) {
      onCreateTrip?.({
        destination,
        startDate,
        endDate,
        interests,
      });
      handleClose();
    }
  };

  const isFormValid = destination && startDate && endDate;

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-200 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl shadow-black/50 transform transition-all duration-200 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{
          animation: isClosing ? "none" : "modalSlideIn 0.3s ease-out",
        }}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <SparkleIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-white"
                >
                  Create New Trip
                </h2>
                <p className="text-sm text-slate-400">
                  Plan your next adventure
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="w-8 h-8 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors hover:cursor-pointer"
              aria-label="Close modal"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative p-6 space-y-5">
          {/* Destination */}
          <div className="space-y-2">
            <label
              htmlFor="destination"
              className="block text-sm font-medium text-slate-300"
            >
              Destination
            </label>
            <div
              className={`relative rounded-xl transition-all duration-200 ${
                focusedField === "destination" ? "ring-2 ring-amber-500/50" : ""
              }`}
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <MapPinIcon className="w-5 h-5" />
              </div>
              <input
                ref={firstInputRef}
                type="text"
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onFocus={() => setFocusedField("destination")}
                onBlur={() => setFocusedField(null)}
                placeholder="Where are you going?"
                className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-slate-300"
              >
                Start Date
              </label>
              <div
                className={`relative rounded-xl transition-all duration-200 ${
                  focusedField === "startDate" ? "ring-2 ring-amber-500/50" : ""
                }`}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  onFocus={() => setFocusedField("startDate")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors scheme-dark"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-slate-300"
              >
                End Date
              </label>
              <div
                className={`relative rounded-xl transition-all duration-200 ${
                  focusedField === "endDate" ? "ring-2 ring-amber-500/50" : ""
                }`}
              >
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  onFocus={() => setFocusedField("endDate")}
                  onBlur={() => setFocusedField(null)}
                  min={startDate}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-amber-500/50 transition-colors scheme-dark"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-2">
            <label
              htmlFor="interests"
              className="block text-sm font-medium text-slate-300"
            >
              Interests{" "}
              <span className="text-slate-500 font-normal">(optional)</span>
            </label>

            {/* Interest tags */}
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-sm font-medium"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="hover:text-amber-100 transition-colors"
                      aria-label={`Remove ${interest}`}
                    >
                      <XIcon className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Input for typing interests */}
            <div
              className={`relative rounded-xl transition-all duration-200 ${
                focusedField === "interests" ? "ring-2 ring-amber-500/50" : ""
              }`}
            >
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                <PlusIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                id="interests"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                onFocus={() => setFocusedField("interests")}
                onBlur={() => setFocusedField(null)}
                placeholder="Type an interest and press Enter"
                className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700/50">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`relative px-6 py-2.5 rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 hover:cursor-pointer ${
                isFormValid
                  ? "active:scale-[0.98]"
                  : "opacity-50 cursor-not-allowed"
              }`}
            >
              <div
                className={`absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500 ${
                  !isFormValid ? "opacity-50" : ""
                }`}
              />
              <div
                className={`absolute inset-0 bg-linear-to-r from-amber-400 to-orange-400 opacity-0 ${
                  isFormValid ? "group-hover:opacity-100" : ""
                } transition-opacity`}
              />
              <span className="relative flex items-center gap-2">
                <SparkleIcon className="w-4 h-4" />
                Create Trip
              </span>
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
