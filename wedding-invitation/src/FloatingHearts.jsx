import { useMemo } from "react";
import "./FloatingHearts.css";

const HEART_COUNT = 18;

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export default function FloatingHearts() {
  // Create layout once to avoid generating on every re-render.
  const hearts = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }, (_, i) => {
        const left = rand(0, 100);
        const drift = rand(-18, 18); // vw
        const scale = rand(0.65, 1.25);
        const rot = rand(-35, 35);
        const dur = rand(6, 12);
        const delay = -rand(0, dur); // negative so it starts mid-animation
        const opacity = rand(0.30, 0.62);
        const size = rand(16, 34);

        return {
          key: i,
          left,
          drift,
          scale,
          rot,
          dur,
          delay,
          opacity,
          size,
        };
      }),
    [],
  );

  return (
    <div className="floating-hearts" aria-hidden>
      {hearts.map((h) => (
        <span
          key={h.key}
          className="float-heart"
          style={{
            left: `${h.left}vw`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
            // CSS custom properties for keyframes.
            ["--drift"]: `${h.drift}vw`,
            ["--scale"]: h.scale,
            ["--rot"]: `${h.rot}deg`,
            ["--opacity"]: h.opacity,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

