"use client";

import { useState, useEffect } from 'react';

const isDaytime = (hour: number): boolean => {
  // Roughly estimate daytime between 6 AM and 8 PM
  return hour >= 6 && hour < 20;
};

const TimeDisplay = () => {
  const [time, setTime] = useState<string>('');
  const [isDaylight, setIsDaylight] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const timeString = now.toLocaleTimeString('de-AT', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      setTime(timeString);
      setIsDaylight(isDaytime(now.getHours()));
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 font-regular text-xl">
      <span>{isDaylight ? '☀️' : '🌑'} {time}</span>
      <span>- Austria 🇦🇹</span>
    </div>
  );
};

export default TimeDisplay;
