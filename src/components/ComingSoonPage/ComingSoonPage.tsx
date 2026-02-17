import { useState, useEffect, useRef } from "react";
import "./ComingSoonPage.css";
import { strings } from "../../comms/strings";

const MS_24H = 24 * 60 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_MINUTE = 60 * 1000;
const MS_PER_SECOND = 1000;

type Countdown = {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
};

function getCountdownFromTarget(targetTime: number, currentTime: number): Countdown {
  let remaining = Math.max(0, targetTime - currentTime);
  const hours = Math.floor(remaining / MS_PER_HOUR);
  remaining %= MS_PER_HOUR;
  const minutes = Math.floor(remaining / MS_PER_MINUTE);
  remaining %= MS_PER_MINUTE;
  const seconds = Math.floor(remaining / MS_PER_SECOND);
  const totalMs = (targetTime - currentTime);
  return { hours, minutes, seconds, totalMs: Math.max(0, totalMs) };
}

/** 0..1 = fraction of 24h remaining (for ring progress) */
function getProgress24h(targetTime: number, currentTime: number): number {
  const remaining = targetTime - currentTime;
  if (remaining <= 0) return 0;
  return Math.min(1, remaining / MS_24H);
}

export function ComingSoonPage() {
  const [now, setNow] = useState(() => Date.now());
  const [targetEndTime, setTargetEndTime] = useState(() => Date.now() + MS_24H);
  const targetEndRef = useRef(targetEndTime);

  targetEndRef.current = targetEndTime;

  useEffect(() => {
    const t = setInterval(() => {
      const current = Date.now();
      if (current >= targetEndRef.current) {
        const next = current + MS_24H;
        targetEndRef.current = next;
        setTargetEndTime(next);
      }
      setNow(current);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const countdown = getCountdownFromTarget(targetEndTime, now);
  const progress = getProgress24h(targetEndTime, now);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="coming-soon coming-soon--standalone">
      <div className="coming-soon__inner">
        <span className="coming-soon__eyebrow">{strings.brand.name}</span>
        <h1 className="coming-soon__headline">{strings.comingSoon.headline}</h1>
        <p className="coming-soon__subline">{strings.comingSoon.subline}</p>

        <div className="coming-soon__clock-wrap" aria-hidden>
          <svg
            className="coming-soon__clock"
            viewBox="0 0 120 120"
            role="img"
            aria-label="Countdown"
          >
            <circle
              className="coming-soon__clock-track"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="6"
            />
            <circle
              className="coming-soon__clock-ring"
              cx="60"
              cy="60"
              r="54"
              fill="none"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress)}`}
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="coming-soon__timer">
            <div className="coming-soon__timer-inner">
            <span className="coming-soon__timer-unit">
              <span className="coming-soon__timer-value" data-unit="hours">
                {pad(countdown.hours)}
              </span>
              <span className="coming-soon__timer-label">Hrs</span>
            </span>
            <span className="coming-soon__timer-sep">:</span>
            <span className="coming-soon__timer-unit">
              <span className="coming-soon__timer-value" data-unit="mins">
                {pad(countdown.minutes)}
              </span>
              <span className="coming-soon__timer-label">Min</span>
            </span>
            <span className="coming-soon__timer-sep">:</span>
            <span className="coming-soon__timer-unit">
              <span className="coming-soon__timer-value" data-unit="secs">
                {pad(countdown.seconds)}
              </span>
              <span className="coming-soon__timer-label">Sec</span>
            </span>
            </div>
          </div>
        </div>

        <p className="coming-soon__countdown-label">
          {strings.comingSoon.countdownLabel}
        </p>
      </div>
    </div>
  );
}
