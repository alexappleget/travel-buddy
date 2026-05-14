export interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTrip?: (trip: {
    destination: string;
    startDate: string;
    endDate: string;
    interests: string[];
  }) => void;
}

export interface ITrips {
  destination: string;
  startDate: string;
  endDate: string;
  interests: string[];
}
