import { useMemo } from "react";
import "./FloatingHearts.css";

const HEART_COUNT = { intro: 14, default: 16 };

function rand(min, max) {
  return min + Math.random() * (max - min);
}

export default function FloatingHearts({ variant = "default" }) {
  const isIntro = variant === "intro";
  const count = HEART_COUNT[variant] ?? HEART_COUNT.default;

  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const left = rand(0, 100);
        const drift = rand(-16, 16);
        const scale = rand(0.75, 1.2);
        const rot = rand(-40, 40);
        const dur = rand(7, 13);
        const delay = -rand(0, dur);
        const opacity = isIntro ? rand(0.42, 0.72) : rand(0.28, 0.55);
        const size = isIntro ? rand(18, 36) : rand(14, 28);

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
    [count, isIntro],
  );

  return (
    <div
      className={`floating-hearts floating-hearts--${variant}`}
      aria-hidden
    >
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
