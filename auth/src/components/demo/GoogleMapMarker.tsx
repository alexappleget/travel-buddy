/**
 * A Google Maps-style marker with a teardrop shape and icon inside.
 * Supports different states: default, highlighted, and saved.
 */

interface GoogleMapMarkerProps {
  icon: "gaming" | "cafe" | "store" | "district" | "museum" | "default";
  isHighlighted?: boolean;
  isSaved?: boolean;
  label?: number; // For numbered markers in itinerary view
  size?: "sm" | "md" | "lg";
}

const iconPaths: Record<string, string> = {
  // Game controller
  gaming:
    "M17.5 8h-11c-1.9 0-3.5 1.6-3.5 3.5v0c0 1.9 1.6 3.5 3.5 3.5h11c1.9 0 3.5-1.6 3.5-3.5v0c0-1.9-1.6-3.5-3.5-3.5zM8 13H7v1H6v-1H5v-1h1v-1h1v1h1v1zm4.5 1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm3 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z",
  // Coffee cup
  cafe: "M18 8h-1V5c0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1v9c0 1.7 1.3 3 3 3h8c1.7 0 3-1.3 3-3v-1h1c1.7 0 3-1.3 3-3v-1c0-.6-.4-1-1-1zm-3 6c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1V6h10v8zm3-4c0 .6-.4 1-1 1h-1V9h1c.6 0 1 .4 1 1v1z",
  // Store/shop
  store:
    "M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V9h14v8zm-7-6c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z",
  // City/district buildings
  district:
    "M15 3H9v2H7v14h10V5h-2V3zm-4 12H9v-2h2v2zm0-4H9V9h2v2zm4 4h-2v-2h2v2zm0-4h-2V9h2v2zm2-4H7V5h2V3h4v2h2v2z",
  // Museum/building with columns
  museum:
    "M12 3L2 8v2h20V8L12 3zm0 2.5L17 8H7l5-2.5zM4 11v8h3v-6h2v6h2v-6h2v6h2v-6h2v6h3v-8H4zm0 9v1h16v-1H4z",
  // Default pin icon
  default:
    "M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z",
};

export const GoogleMapMarker = ({
  icon,
  isHighlighted = false,
  isSaved = false,
  label,
  size = "md",
}: GoogleMapMarkerProps) => {
  const sizes = {
    sm: { width: 24, height: 32, iconScale: 0.5 },
    md: { width: 32, height: 42, iconScale: 0.6 },
    lg: { width: 40, height: 52, iconScale: 0.7 },
  };

  const { width, height, iconScale } = sizes[size];

  // Google Maps red for default, green for saved, amber for highlighted
  const fillColor = isSaved
    ? "#34a853" // Google green
    : isHighlighted
      ? "#fbbc04" // Google yellow
      : "#ea4335"; // Google red

  const glowColor = isSaved
    ? "rgba(52, 168, 83, 0.4)"
    : isHighlighted
      ? "rgba(251, 188, 4, 0.5)"
      : "rgba(234, 67, 53, 0.3)";

  return (
    <div className="relative" style={{ width, height }}>
      {/* Pulse animation for highlighted state */}
      {isHighlighted && (
        <div
          className="absolute animate-ping"
          style={{
            width: width * 1.5,
            height: width * 1.5,
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            backgroundColor: glowColor,
            borderRadius: "50%",
          }}
        />
      )}

      {/* Shadow */}
      <div
        className="absolute"
        style={{
          width: width * 0.6,
          height: 6,
          left: "50%",
          bottom: -2,
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "50%",
          filter: "blur(2px)",
        }}
      />

      <svg
        width={width}
        height={height}
        viewBox="0 0 32 42"
        fill="none"
        className="drop-shadow-lg"
        style={{
          filter: `drop-shadow(0 2px 4px ${glowColor})`,
        }}
      >
        {/* Teardrop/pin shape */}
        <path
          d="M16 0C7.16 0 0 7.16 0 16c0 12 16 26 16 26s16-14 16-26C32 7.16 24.84 0 16 0z"
          fill={fillColor}
        />

        {/* Inner highlight for 3D effect */}
        <path
          d="M16 2C8.27 2 2 8.27 2 16c0 10.5 14 23 14 23"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* White circle background for icon */}
        <circle cx="16" cy="14" r="10" fill="white" />

        {/* Icon or number */}
        {label !== undefined ? (
          <text
            x="16"
            y="18"
            textAnchor="middle"
            fill={fillColor}
            fontSize="12"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            {label}
          </text>
        ) : (
          <g
            transform={`translate(${16 - 12 * iconScale}, ${14 - 12 * iconScale}) scale(${iconScale})`}
          >
            <path d={iconPaths[icon] || iconPaths.default} fill={fillColor} />
          </g>
        )}
      </svg>
    </div>
  );
};
