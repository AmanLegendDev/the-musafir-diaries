"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, scrollProgress)));
    };

    calculateProgress();

    window.addEventListener("scroll", calculateProgress);

    return () => {
      window.removeEventListener("scroll", calculateProgress);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}