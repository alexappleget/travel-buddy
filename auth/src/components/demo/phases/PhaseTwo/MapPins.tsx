import { GoogleMapMarker } from "../../GoogleMapMarker";
import { IPlace } from "./types";

export const MapPins = ({
  place,
  savedPlaces,
  highlightedPlace,
}: {
  place: IPlace;
  savedPlaces: number[];
  highlightedPlace: number | null;
}) => {
  const isSaved = savedPlaces.includes(place.id);
  const isHighlighted = highlightedPlace === place.id;
  const isActive = isSaved || isHighlighted;

  return (
    <div
      key={place.id}
      className={`absolute transition-all duration-500 ${
        isActive ? "opacity-100 scale-100 z-10" : "opacity-60 scale-75"
      }`}
      style={{
        left: `${place.x}%`,
        top: `${place.y}%`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <GoogleMapMarker
        icon={place.icon}
        isSaved={isSaved}
        isHighlighted={isHighlighted}
        size={isActive ? "md" : "sm"}
      />
    </div>
  );
};
