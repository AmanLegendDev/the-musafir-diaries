"use client";

import { useEffect, useState } from "react";

export default function BlogReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const article = document.getElementById("article");

      if (!article) {
        setProgress(0);
        return;
      }

      const articleTop =
        article.getBoundingClientRect().top + window.scrollY;

      const articleHeight = article.offsetHeight;
      const viewportHeight = window.innerHeight;

      const scrollableDistance =
        articleHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const current =
        ((window.scrollY - articleTop) / scrollableDistance) * 100;

      setProgress(Math.min(100, Math.max(0, current)));
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-[#F59E0B] transition-[width] duration-100"
        style={{
          width: `${progress}%`,
        }}
      />
    </div>
  );
}