import { places } from "../../places";

export const RouteLines = ({
  itineraryItems,
}: {
  itineraryItems: {
    day: number;
    placeId: number;
  }[];
}) => {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Google Maps blue route gradient */}
        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4285f4" />
          <stop offset="100%" stopColor="#1a73e8" />
        </linearGradient>
        <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {itineraryItems.slice(0, -1).map((item, idx) => {
        const fromPlace = places.find((p) => p.id === item.placeId);
        const toPlace = places.find(
          (p) => p.id === itineraryItems[idx + 1]?.placeId,
        );
        if (!fromPlace || !toPlace) return null;

        // Calculate actual line length for proper dash animation
        const dx = toPlace.x - fromPlace.x;
        const dy = toPlace.y - fromPlace.y;
        const lineLength = Math.sqrt(dx * dx + dy * dy);

        // Midpoint for distance label
        const midX = (fromPlace.x + toPlace.x) / 2;
        const midY = (fromPlace.y + toPlace.y) / 2;

        // Fixed distance values for consistency
        const distances = [1.2, 3.5, 2.1];

        return (
          <g key={idx}>
            {/* Background glow line - Google blue */}
            <line
              x1={fromPlace.x}
              y1={fromPlace.y}
              x2={toPlace.x}
              y2={toPlace.y}
              stroke="#4285f4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity="0.4"
              filter="url(#routeGlow)"
              strokeDasharray={lineLength}
              strokeDashoffset={lineLength}
              style={{
                animation: `drawRoute ${0.6 + idx * 0.1}s ease-out forwards`,
                animationDelay: `${idx * 0.25}s`,
              }}
            />
            {/* Main route line */}
            <line
              x1={fromPlace.x}
              y1={fromPlace.y}
              x2={toPlace.x}
              y2={toPlace.y}
              stroke="url(#routeGrad)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray={lineLength}
              strokeDashoffset={lineLength}
              style={{
                animation: `drawRoute ${0.6 + idx * 0.1}s ease-out forwards`,
                animationDelay: `${idx * 0.25}s`,
              }}
            />
            {/* Distance label at midpoint - Google Maps style */}
            <g
              style={{
                animation: `fadeIn 0.4s ease-out forwards`,
                animationDelay: `${0.4 + idx * 0.25}s`,
                opacity: 0,
              }}
            >
              <rect
                x={midX - 5.5}
                y={midY - 3}
                width="11"
                height="6"
                rx="2"
                fill="white"
                stroke="rgba(66, 133, 244, 0.3)"
                strokeWidth="0.4"
              />
              <text
                x={midX}
                y={midY + 1}
                textAnchor="middle"
                fill="#1a73e8"
                fontSize="2.5"
                fontWeight="600"
                fontFamily="system-ui, sans-serif"
              >
                {distances[idx]} km
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
};
