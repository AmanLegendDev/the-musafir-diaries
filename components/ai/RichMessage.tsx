"use client";

import TypingText from "./TypingText";
import LinkCard from "./LinkCard";

interface RichMessageProps {
  content: string;
  animate?: boolean;
}

const urlRegex =
  /(https?:\/\/[^\s]+)/g;

export default function RichMessage({
  content,
  animate = false,
}: RichMessageProps) {
  const parts =
    content.split(urlRegex);

  return (
    <div className="space-y-3">
      {parts.map((part, index) => {
        const isUrl =
          urlRegex.test(part);

        urlRegex.lastIndex = 0;

        if (isUrl) {
          return (
            <LinkCard
              key={index}
              url={part.trim()}
            />
          );
        }

        if (!part.trim()) return null;

        return (
          <p
            key={index}
            className="
              whitespace-pre-wrap
              text-[15px]
              leading-7
            "
          >
            <TypingText
              text={part}
              animate={
                animate &&
                index === 0
              }
            />
          </p>
        );
      })}
    </div>
  );
}