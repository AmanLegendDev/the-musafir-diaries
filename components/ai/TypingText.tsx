"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface TypingTextProps {
  text: string;
  animate: boolean;
  speed?: number;
  onComplete?: () => void;
}

export default function TypingText({
  text,
  animate,
  speed = 35,
  onComplete,
}: TypingTextProps) {
  const [displayed, setDisplayed] =
    useState(animate ? "" : text);

  const [finished, setFinished] =
    useState(!animate);

  const timeoutRef =
    useRef<NodeJS.Timeout | null>(
      null
    );

  useEffect(() => {
    if (!animate) {
      setDisplayed(text);
      setFinished(true);
      return;
    }

    setDisplayed("");
    setFinished(false);

    const words =
      text.split(/(\s+)/);

    let index = 0;

    function type() {
      if (
        index >= words.length
      ) {
        setFinished(true);

        onComplete?.();

        return;
      }

      index++;

      setDisplayed(
        words
          .slice(0, index)
          .join("")
      );

      const current =
        words[index - 1] ?? "";

      let delay = speed;

      if (
        /[.!?]/.test(current)
      ) {
        delay += 180;
      } else if (
        /[,;]/.test(current)
      ) {
        delay += 90;
      }

      timeoutRef.current =
        setTimeout(
          type,
          delay
        );
    }

    type();

    return () => {
      if (
        timeoutRef.current
      ) {
        clearTimeout(
          timeoutRef.current
        );
      }
    };
  }, [
    animate,
    text,
    speed,
    onComplete,
  ]);

  return (
    <>
      <span className="whitespace-pre-wrap">
        {displayed}
      </span>

      {!finished && (
        <span
          className="
            ml-0.5
            inline-block

            animate-pulse

            font-bold

            text-emerald-600
          "
        >
          ▌
        </span>
      )}
    </>
  );
}