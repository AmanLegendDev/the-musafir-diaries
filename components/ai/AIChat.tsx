"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  X,
  Sparkles,
} from "lucide-react";

import ChatInput from "./ChatInput";

import { useEffect, useRef } from "react";
import AIMessage from "./AIMessage";
import SuggestedQuestions from "./SuggestedQuestions";
import {  Loader2 } from "lucide-react";
import {
  DEFAULT_SUGGESTIONS,
  Message,
} from "@/types/ai";

interface AIChatProps {
  open: boolean;
  onClose: () => void;

  messages: Message[];
  loading: boolean;

  input: string;
  onInputChange: (
  e: React.ChangeEvent<HTMLTextAreaElement>
) => void;

  onSubmit: () => void;

  onSuggestionClick: (
    prompt: string
  ) => void;
}
export default function AIChat({
  open,
  onClose,
  messages,
  loading,
  input,
  onInputChange,
  onSubmit,
  onSuggestionClick,
}: AIChatProps) {


    const messagesEndRef =
  useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, loading]);



useEffect(() => {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [open]);


const lastAssistantMessageId =
  [...messages]
    .reverse()
    .find(
      (message) =>
        message.role === "assistant"
    )?.id;



useEffect(() => {
  function handleEscape(
    event: KeyboardEvent
  ) {
    if (event.key === "Escape") {
      onClose();
    }
  }

  window.addEventListener(
    "keydown",
    handleEscape
  );

  return () => {
    window.removeEventListener(
      "keydown",
      handleEscape
    );
  };
}, [onClose]);
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              z-40
              bg-black/30
              backdrop-blur-[2px]
              lg:bg-transparent
              lg:backdrop-blur-0
            "
          />

          {/* Chat Window */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
           className="
fixed
inset-0
z-[9999]

flex
flex-col

bg-white

overflow-hidden

shadow-2xl
"
          >
            {/* Header */}

            <div
              className="
                relative

                overflow-hidden

                border-b

                border-emerald-100

                bg-gradient-to-r

                from-emerald-700

                via-emerald-600

                to-teal-600

                px-6

                py-5

                text-white
              "
            >
              {/* Decorative Glow */}

              <div
                className="
                  absolute

                  -right-12
                  -top-12

                  h-36
                  w-36

                  rounded-full

                  bg-white/10

                  blur-3xl
                "
              />

              <div
                className="
                  relative

                  flex

                  items-center

                  justify-between
                "
              >
                {/* Left */}

                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex

                      h-14
                      w-14

                      items-center
                      justify-center

                      rounded-2xl

                      bg-white/15

                      backdrop-blur
                    "
                  >
                    <Bot
                      size={28}
                    />
                  </div>

                  <div>
                    <h2
                      className="
                        text-xl

                        font-bold
                      "
                    >
                      Altitude AI
                    </h2>

                    <div
                      className="
                        mt-1

                        flex

                        items-center

                        gap-2

                        text-sm

                        text-emerald-100
                      "
                    >
                      <span
                        className="
                          h-2.5
                          w-2.5

                          animate-pulse

                          rounded-full

                          bg-lime-300
                        "
                      />

                      Online • Ready to help
                    </div>
                  </div>
                </div>



                {/* Right */}

                <button
                  onClick={onClose}
                  className="
                    rounded-xl

                    p-2

                    transition

                    hover:bg-white/15
                  "
                >
                  <X
                    size={22}
                  />
                </button>
              </div>

              {/* Bottom Tag */}

              <div
                className="
                  relative

                  mt-5

                  flex

                  items-center

                  gap-2

                  rounded-2xl

                  bg-white/10

                  px-4

                  py-3

                  text-sm

                  backdrop-blur
                "
              >
                <Sparkles
                  size={16}
                />

                <span>
                  Ask about packages, destinations,
                  pricing, itineraries & travel tips.
                </span>
              </div>
            </div>

            {/* Remaining Content */}
<div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-gradient-to-b from-white to-slate-50">
  {messages.length <= 1 ? (
    <>
      <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl">
          <Bot size={38} />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          Welcome to Altitude AI
        </h2>

        <p className="max-w-md leading-7 text-slate-500">
          I'm your personal travel assistant.
          I can help you discover destinations,
          recommend packages, explain itineraries,
          answer pricing questions and plan your
          perfect Himalayan adventure.
        </p>

        <div className="mt-8 flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          <Sparkles size={16} />
          Instant AI Travel Guidance
        </div>
      </div>

      <SuggestedQuestions
        questions={DEFAULT_SUGGESTIONS}
        onSelect={onSuggestionClick}
        disabled={loading}
      />
    </>
    
  ) : (
    
    <div className="flex-1 overflow-y-auto px-5 py-6">
      <div className="space-y-5">

        
 {messages
  .filter(
    (
      message
    ): message is Message & {
      role: "user" | "assistant";
    } => message.role !== "system"
  )
  .map((message) => {
    const isLatestAssistant =
      message.id ===
      lastAssistantMessageId;

    return (
      <AIMessage
        key={message.id}
        role={message.role}
        content={message.content}
        animate={isLatestAssistant}
      />
    );
  })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Bot size={18} />
            </div>

            <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
              <Loader2
                className="animate-spin text-emerald-600"
                size={18}
              />

              <span className="text-sm text-slate-500">
                Altitude AI is thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  )}
</div>

<ChatInput
  input={input}
  onInputChange={onInputChange}
  onSubmit={onSubmit}
  loading={loading}
/>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}