"use client";

import {
  Bot,
  User,
  Copy,
  Check,
} from "lucide-react";
import TypingText from "./TypingText";

import RichMessage from "./RichMessage";

import { memo, useState } from "react";

interface AIMessageProps {
  role: "user" | "assistant";
  content: string;
  animate?: boolean;
}

function AIMessage({
  role,
  content,
  animate = false,
}: AIMessageProps) {
  const [copied, setCopied] =
    useState(false);

  const isUser =
    role === "user";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(
        content
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    }
  }

  return (
   <div
  className={`
    flex
    w-full
    mb-6

    ${
      isUser
        ? "justify-end"
        : "justify-start"
    }
  `}
>
      <div
       className={`
flex
w-full

${
  isUser
    ? "justify-end"
    : "justify-start"
}
`}
      >
        
        

     <div
  className={`
    group
    relative

    ${
      isUser
        ? "ml-auto max-w-[82%]"
        : "max-w-[94%] md:max-w-[85%]"
    }

    rounded-[28px]

    px-6
    py-5

    shadow-lg

    transition-all

            ${
              isUser
                ? `
                  bg-gradient-to-br
                  from-emerald-600
                  to-emerald-700

                  text-white
                `
                : `
                  border
                  border-slate-200

                  bg-white

                  text-slate-800
                `
            }
          `}
        >

          {isUser && (
  <div className="mb-4 flex justify-start">
  <div className="flex items-center gap-3">

    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center

        rounded-full

        bg-gradient-to-br
        from-slate-800
        to-slate-950

        text-white

        shadow-lg
      "
    >
      <User size={18} />
    </div>

    <div className="text-left">
      <p className="font-semibold text-white">
        You
      </p>

      <p className="text-xs text-emerald-200">
        Travel Explorer
      </p>
    </div>

  </div>
</div>
)}
         {!isUser && (
  <div className="mb-4 flex items-center gap-3">
    <div
      className="
        flex
        h-10
        w-10
        items-center
        justify-center

        rounded-full

        bg-gradient-to-br
        from-emerald-600
        to-teal-600

        text-white
      "
    >
      <Bot size={18} />
    </div>

    <div>
      <p className="font-semibold text-slate-900">
        Altitude AI
      </p>

      <p className="text-xs text-emerald-600">
        Luxury Travel Expert
      </p>
    </div>
  </div>
)}

  {isUser ? (
  <p
    className="
      whitespace-pre-wrap
      text-[15px]
      leading-7
    "
  >
    {content}
  </p>
) : (
  <RichMessage
    content={content}
    animate={animate}
  />
)}
          {!isUser && (
            <button
              onClick={
                handleCopy
              }
              className="
                absolute
                -right-3
                -top-3

                flex
                h-9
                w-9
                items-center
                justify-center

                rounded-full

                border
                border-slate-200

                bg-white

                shadow-md

                opacity-0

                transition-all

                group-hover:opacity-100

                hover:scale-105
              "
            >
              {copied ? (
                <Check
                  size={16}
                  className="text-emerald-600"
                />
              ) : (
                <Copy size={16} />
              )}
            </button>
          )}
        </div>

       
      </div>
    </div>
  );
}

export default memo(AIMessage);