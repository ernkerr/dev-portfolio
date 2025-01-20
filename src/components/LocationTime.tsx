import { useState, useEffect } from "react";
import { geistMono } from "../../public/fonts/fonts";

// TODO: API to pull location instead of hardcoding it

export default function LocationTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Los_Angeles",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateTime(); // initial update

    // update every minute
    const interval = setInterval(updateTime, 60000);

    // cleanup on dismount
    return () => clearInterval(interval);

    // when a react component mounts, any side effects (like intervals) will cont running
    // can lead to multiple running simultaneously
    // waste of memory/CPU resources / improves app performance
    //
  }, []);

  return (
    <div
      className={` text-white flex flex-row gap-2 md:gap-4 lg:gap-6 md:m-1 text-xs md:text-sm`}
    >
      <h1 className={`${geistMono.className}`}>SAN FRANCISCO, CA </h1>
      <h2>{time}</h2>
    </div>
  );
}
