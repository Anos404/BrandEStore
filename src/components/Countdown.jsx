import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [time, setTime] = useState({ d: 4, h: 13, m: 34, s: 56 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { d, h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; d--; }
        if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, '0');
  return (
    <div className="countdown">
      {[['Days', time.d], ['Hour', time.h], ['Min', time.m], ['Sec', time.s]].map(([label, val]) => (
        <div key={label} className="countdown-item">
          <span className="countdown-num">{pad(val)}</span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
