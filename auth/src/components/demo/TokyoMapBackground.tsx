export const TokyoMapBackground = ({ zoom = 1 }: { zoom?: number }) => {
  return (
    <div
      className="absolute inset-0 transition-transform duration-1000 ease-out overflow-hidden"
      style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle noise texture for realism */}
          <filter id="mapNoise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
            />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
          </filter>

          {/* Shadow for depth */}
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0.3"
              dy="0.3"
              stdDeviation="0.5"
              floodOpacity="0.15"
            />
          </filter>

          {/* Road glow effect */}
          <filter id="roadGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="0.3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Edge fade gradients for natural map boundaries */}

          <linearGradient id="edgeFadeTop" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f2efe9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f2efe9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="edgeFadeBottom" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f2efe9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f2efe9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="edgeFadeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f2efe9" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f2efe9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="edgeFadeRight" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#9ecfdf" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#9ecfdf" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base layer - Google Maps style off-white/cream */}
        <rect width="200" height="200" fill="#f2efe9" />

        {/* Subtle urban texture overlay */}
        <rect width="200" height="200" fill="#e8e4dd" opacity="0.3" />

        {/* ========== MAJOR ROADS ========== */}

        {/* Primary roads */}
        <g stroke="#ffffff" strokeLinecap="round" filter="url(#roadGlow)">
          {/* Horizontal major arteries */}
          <line x1="0" y1="40" x2="200" y2="40" strokeWidth="2.5" />
          <line x1="0" y1="72" x2="200" y2="72" strokeWidth="2.5" />
          <line x1="0" y1="100" x2="200" y2="100" strokeWidth="2.5" />
          <line x1="0" y1="130" x2="200" y2="130" strokeWidth="2.5" />
          <line x1="0" y1="165" x2="200" y2="165" strokeWidth="2.5" />

          {/* Vertical major arteries */}
          <line x1="30" y1="0" x2="30" y2="200" strokeWidth="2.5" />
          <line x1="65" y1="0" x2="65" y2="200" strokeWidth="2.5" />
          <line x1="100" y1="0" x2="100" y2="200" strokeWidth="2.5" />
          <line x1="130" y1="0" x2="130" y2="200" strokeWidth="2.5" />
        </g>

        {/* Secondary roads */}
        <g stroke="#ffffff" strokeLinecap="round" opacity="0.9">
          {/* Horizontal */}
          <line x1="0" y1="20" x2="200" y2="20" strokeWidth="1.5" />
          <line x1="0" y1="55" x2="200" y2="55" strokeWidth="1.5" />
          <line x1="0" y1="115" x2="200" y2="115" strokeWidth="1.5" />
          <line x1="0" y1="148" x2="200" y2="148" strokeWidth="1.5" />
          <line x1="0" y1="182" x2="200" y2="182" strokeWidth="1.5" />

          {/* Vertical */}
          <line x1="15" y1="0" x2="15" y2="200" strokeWidth="1.5" />
          <line x1="48" y1="0" x2="48" y2="200" strokeWidth="1.5" />
          <line x1="82" y1="0" x2="82" y2="200" strokeWidth="1.5" />
          <line x1="115" y1="0" x2="115" y2="200" strokeWidth="1.5" />
          <line x1="150" y1="0" x2="150" y2="200" strokeWidth="1.5" />
          <line x1="163" y1="0" x2="163" y2="200" strokeWidth="1.5" />
        </g>

        {/* Tertiary roads - subtle grid */}
        <g stroke="#ffffff" strokeLinecap="round" opacity="0.5">
          {/* Horizontal tertiary roads - extend continuously across the map */}
          {[8, 24, 38, 56, 68, 88, 108, 122, 140, 156, 172, 190].map((y) => (
            <line
              key={"h-" + y}
              x1="0"
              y1={y}
              x2="200"
              y2={y}
              strokeWidth="0.8"
            />
          ))}

          {/* Vertical tertiary roads - now filling through the eastern side */}
          {[8, 22, 38, 56, 74, 92, 108, 122, 136, 144, 158, 170, 182, 192].map(
            (x) => (
              <line
                key={"v-" + x}
                x1={x}
                y1="0"
                x2={x}
                y2="200"
                strokeWidth="0.8"
              />
            ),
          )}

          {/* Subtle curved connectors to break perfect grid */}
          <path
            d="M132,34 Q148,40 168,36 Q184,34 198,40"
            fill="none"
            strokeWidth="0.7"
            opacity="0.45"
          />
          <path
            d="M128,118 Q146,124 166,120 Q182,118 198,124"
            fill="none"
            strokeWidth="0.7"
            opacity="0.45"
          />
          <path
            d="M130,150 Q148,156 170,152 Q186,150 198,156"
            fill="none"
            strokeWidth="0.7"
            opacity="0.45"
          />
        </g>

        {/* ========== CITY BLOCKS - Dense urban texture ========== */}

        <g opacity="0.18">
          {/* Shinjuku commercial district - dense */}
          <rect x="32" y="42" width="8" height="6" fill="#d4d0c8" rx="0.8" />
          <rect x="32" y="50" width="6" height="8" fill="#d4d0c8" rx="0.8" />
          <rect x="40" y="44" width="5" height="10" fill="#d4d0c8" rx="0.8" />
          <rect x="34" y="60" width="10" height="5" fill="#ccc8c0" rx="0.8" />

          {/* Shibuya district */}
          <rect x="22" y="108" width="7" height="8" fill="#d4d0c8" rx="0.8" />
          <rect x="22" y="118" width="5" height="6" fill="#d4d0c8" rx="0.8" />
          <rect x="30" y="110" width="6" height="10" fill="#d4d0c8" rx="0.8" />
          <rect x="28" y="122" width="8" height="5" fill="#ccc8c0" rx="0.8" />

          {/* Akihabara / Electric Town */}
          <rect x="105" y="75" width="8" height="6" fill="#d4d0c8" rx="0.8" />
          <rect x="115" y="73" width="6" height="8" fill="#d4d0c8" rx="0.8" />
          <rect x="108" y="83" width="10" height="5" fill="#ccc8c0" rx="0.8" />
          <rect x="105" y="90" width="6" height="6" fill="#d4d0c8" rx="0.8" />

          {/* Ginza - premium district */}
          <rect x="110" y="110" width="8" height="7" fill="#c8c4bc" rx="0.8" />
          <rect x="120" y="108" width="6" height="10" fill="#c8c4bc" rx="0.8" />
          <rect x="112" y="120" width="12" height="6" fill="#c0bcb4" rx="0.8" />

          {/* Tokyo Station area */}
          <rect x="98" y="95" width="12" height="8" fill="#c0bcb4" rx="1" />
          <rect x="112" y="92" width="8" height="12" fill="#c8c4bc" rx="1" />

          {/* Ikebukuro */}
          <rect x="72" y="22" width="8" height="6" fill="#d4d0c8" rx="0.8" />
          <rect x="82" y="20" width="6" height="8" fill="#d4d0c8" rx="0.8" />
          <rect x="75" y="30" width="10" height="5" fill="#ccc8c0" rx="0.8" />

          {/* Roppongi */}
          <rect x="70" y="130" width="7" height="8" fill="#d4d0c8" rx="0.8" />
          <rect x="78" y="128" width="6" height="10" fill="#d4d0c8" rx="0.8" />
          <rect x="72" y="140" width="10" height="5" fill="#ccc8c0" rx="0.8" />

          {/* Scattered residential blocks */}
          <rect x="5" y="25" width="5" height="4" fill="#dcd8d0" rx="0.5" />
          <rect x="12" y="30" width="4" height="5" fill="#dcd8d0" rx="0.5" />
          <rect x="5" y="45" width="6" height="4" fill="#dcd8d0" rx="0.5" />
          <rect x="8" y="65" width="4" height="5" fill="#dcd8d0" rx="0.5" />
          <rect x="5" y="150" width="5" height="6" fill="#dcd8d0" rx="0.5" />
          <rect x="12" y="160" width="6" height="4" fill="#dcd8d0" rx="0.5" />
          <rect x="45" y="150" width="5" height="5" fill="#dcd8d0" rx="0.5" />
          <rect x="52" y="155" width="4" height="6" fill="#dcd8d0" rx="0.5" />
          <rect x="88" y="145" width="6" height="5" fill="#dcd8d0" rx="0.5" />
          <rect x="95" y="150" width="5" height="6" fill="#dcd8d0" rx="0.5" />
          <rect x="85" y="165" width="7" height="4" fill="#dcd8d0" rx="0.5" />
        </g>

        {/* ========== SUBTLE VIGNETTE OVERLAY ========== */}
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill="url(#vignette)" />

        {/* ========== EDGE FADE OVERLAYS ========== */}
        <rect x="0" y="0" width="200" height="12" fill="url(#edgeFadeTop)" />
        <rect
          x="0"
          y="188"
          width="200"
          height="12"
          fill="url(#edgeFadeBottom)"
        />
        <rect x="0" y="0" width="12" height="200" fill="url(#edgeFadeLeft)" />
        <rect
          x="188"
          y="0"
          width="12"
          height="200"
          fill="url(#edgeFadeRight)"
        />
      </svg>
    </div>
  );
};
