export const FakeMapBackground = () => {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M10,20 Q30,10 50,25 T90,20"
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          strokeWidth="0.3"
        />
        <path
          d="M5,40 Q25,50 45,35 T95,45"
          stroke="rgba(255,255,255,0.2)"
          fill="none"
          strokeWidth="0.3"
        />
        <path
          d="M15,60 Q35,70 55,55 T85,65"
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          strokeWidth="0.3"
        />
        <path
          d="M10,80 Q30,90 50,75 T90,85"
          stroke="rgba(255,255,255,0.2)"
          fill="none"
          strokeWidth="0.3"
        />
        <line
          x1="30"
          y1="20"
          x2="70"
          y2="80"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        <line
          x1="20"
          y1="50"
          x2="80"
          y2="40"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
};
