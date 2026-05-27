import { useState, useCallback } from "react";
import "./EnvelopeIntro.css";

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 6.5) % 90}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${10 + (i % 5) * 2}s`,
  size: 8 + (i % 4) * 3,
}));

export default function EnvelopeIntro({ onOpen, onOpenStart }) {
  const [opening, setOpening] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleOpen = useCallback(() => {
    if (opening) return;
    setOpening(true);
    setExiting(true);
    onOpenStart?.();
    window.setTimeout(() => onOpen(), 1400);
  }, [opening, onOpen, onOpenStart]);

  return (
    <div
      className={`envelope-scene${exiting ? " is-exiting" : ""}`}
      role="dialog"
      aria-label="Wedding invitation envelope"
    >
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size * 1.3,
          }}
        />
      ))}

      <div className="envelope-stage">
        <div className={`envelope-3d${opening ? " is-opening" : ""}`}>
          <div className="env-back" aria-hidden />

          <div className="env-letter">
            <span className="env-letter-tag">You&apos;re invited</span>
            <p className="env-letter-couple">Justin &amp; Cristine</p>
            <p className="env-letter-date">June 6, 2026 · 8:00 AM</p>
          </div>

          <div className="env-left" aria-hidden />
          <div className="env-right" aria-hidden />
          <div className="env-bottom" aria-hidden />

          <div className="env-address" aria-hidden>
            <div className="env-address-line" />
            <div className="env-address-line" />
            <div className="env-address-line" />
          </div>

          <div className="env-stamp" aria-hidden>
            <span className="env-stamp-heart">♥</span>
            <span className="env-stamp-year">2026</span>
          </div>

          <div className="env-flap">
            <div className="env-flap-face" />
            <div className="env-flap-fold" />
            <button
              type="button"
              className="wax-seal"
              onClick={handleOpen}
              aria-label="Break wax seal to open invitation"
              disabled={opening}
            >
              <span className="wax-seal-shine" aria-hidden />
              <span className="wax-seal-text">J &amp; C</span>
            </button>
          </div>
        </div>
      </div>

      <div className="envelope-glow" aria-hidden />

      <div className="envelope-cta">
        <p className="envelope-hint">Break the seal · A special delivery for you</p>
        <button
          type="button"
          className="btn-open-envelope"
          onClick={handleOpen}
          disabled={opening}
        >
          {opening ? "Opening…" : "Open"}
        </button>
      </div>
    </div>
  );
}
