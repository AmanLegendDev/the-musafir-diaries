"use client";

import { useRef } from "react";
import {
  Loader2,
  SendHorizontal,
} from "lucide-react";

interface ChatInputProps {
  input: string;

  onInputChange: (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;

  onSubmit: () => void;

  loading?: boolean;
}

export default function ChatInput({
  input,
  onInputChange,
  onSubmit,
  loading = false,
}: ChatInputProps) {
  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  function autoResize() {
    const textarea =
      textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";

    textarea.style.height =
      `${Math.min(
        textarea.scrollHeight,
        160
      )}px`;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    onInputChange(e);

    requestAnimationFrame(
      autoResize
    );
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();

      if (
        input.trim() &&
        !loading
      ) {
        onSubmit();
      }
    }
  }

  return (
    <div
      className="
        border-t
        border-slate-200/80

        bg-white/95

        p-4

        backdrop-blur-xl
      "
    >
      <div
        className="
          flex
          items-end
          gap-3

          rounded-3xl

          border
          border-slate-200

          bg-white

          px-4
          py-3

          shadow-sm

          transition-all

          duration-200

          focus-within:border-emerald-500
          focus-within:ring-4
          focus-within:ring-emerald-100
        "
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask anything about your Himalayan trip..."
          className="
            max-h-40

            flex-1

            resize-none

            overflow-y-auto

            bg-transparent

            text-[15px]

            leading-6

            outline-none

            placeholder:text-slate-400
          "
        />

        <button
          type="button"
          onClick={onSubmit}
          disabled={
            loading ||
            !input.trim()
          }
          className="
            flex

            h-11
            w-11

            shrink-0

            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-emerald-600
            to-teal-600

            text-white

            shadow-lg

            transition-all

            duration-200

            hover:scale-105

            active:scale-95

            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          ) : (
            <SendHorizontal
              size={18}
            />
          )}
        </button>
      </div>

      <div
        className="
          mt-2

          flex

          items-center

          justify-between

          px-2

          text-xs

          text-slate-400
        "
      >
        <span>
          Press <strong>Enter</strong> to send
        </span>

        <span>
          Shift + Enter for new line
        </span>
      </div>
    </div>
  );
}