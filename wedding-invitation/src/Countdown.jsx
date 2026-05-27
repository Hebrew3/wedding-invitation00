import { useEffect, useState } from "react";

const WEDDING_DATE_MS = new Date("June 6, 2026 08:00:00").getTime();

function calculateTimeLeft() {
  const now = Date.now();
  const difference = WEDDING_DATE_MS - now;

  return {
    days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
    hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
    minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
    seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-glass">
      <div className="countdown-grid">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Minutes", value: timeLeft.minutes },
          { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
          <div key={index} className="countdown-cell text-white">
            <span className="countdown-value">{item.value}</span>
            <span className="countdown-label">{item.label}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn-primary"
        onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
      >
        View Invitation
      </button>
    </div>
  );
}

