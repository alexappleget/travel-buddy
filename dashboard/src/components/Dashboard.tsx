import { useState, type ReactNode } from "react";
import { GlobeIcon, PlusIcon } from "./Icons";
import { mockTrips } from "./MockTrips";
import { TripCard } from "./TripCard";
import { EmptyState } from "./EmptyState";

export const Dashboard = ({ logoutButton }: { logoutButton: ReactNode }) => {
  const [showTrips] = useState(true);
  const trips = showTrips ? mockTrips : [];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <GlobeIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">
                Travel Buddy
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative px-4 py-2 rounded-xl font-medium text-white overflow-hidden group transition-all duration-300 active:scale-[0.98] hover:cursor-pointer">
                <div className="absolute inset-0 bg-linear-to-r from-amber-500 to-orange-500" />
                <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative flex items-center gap-2 text-sm">
                  <PlusIcon className="w-4 h-4" />
                  Start New Trip
                </span>
              </button>

              <div className="h-8 w-px bg-slate-700" />

              {logoutButton}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">My Trips</h1>
          <p className="text-slate-400 mt-1">
            Plan and organize your upcoming adventures
          </p>
        </div>

        {trips.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
            <EmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
