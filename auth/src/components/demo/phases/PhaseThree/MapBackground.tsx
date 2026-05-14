export const MapBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M10,30 Q30,20 50,35 T90,30"
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          strokeWidth="0.5"
        />
        <path
          d="M15,50 Q35,60 55,45 T85,55"
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          strokeWidth="0.5"
        />
        <path
          d="M10,70 Q30,80 50,65 T90,75"
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};
