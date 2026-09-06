"use client";

import { useState } from "react";

import AIButton from "./AIButton";
import AIChat from "./AIChat";

import { useAI } from "@/app/hooks/useAI";

export default function AIWidget() {
  const [open, setOpen] = useState(false);

  const {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
  } = useAI();

  return (
    <>
      <AIButton
        onClick={() => setOpen(true)}
      />

      <AIChat
        open={open}
        onClose={() => setOpen(false)}
        messages={messages}
        loading={loading}
        input={input}
        onInputChange={(e) =>
          setInput(e.target.value)
        }
        onSubmit={() =>
          sendMessage()
        }
        onSuggestionClick={(prompt) =>
          sendMessage(prompt)
        }
      />
    </>
  );
}