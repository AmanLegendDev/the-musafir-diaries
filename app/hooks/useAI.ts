"use client";

import { useState } from "react";

import type { Message } from "@/types/ai";

import {
  DEFAULT_SUGGESTIONS,
} from "@/types/ai";

export function useAI() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: crypto.randomUUID(),

        role: "assistant",

        content:
          "👋 Welcome to Altitude Escapes!\n\nI'm Altitude AI, your personal Himalayan travel expert.\n\nHow can I help you today?",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function sendMessage(
    text?: string
  ) {
    const message =
      (text ?? input).trim();

    if (!message || loading)
      return;

    const userMessage: Message = {
      id: crypto.randomUUID(),

      role: "user",

      content: message,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setInput("");

    setLoading(true);

    setError(null);

    try {
      const response =
        await fetch("/api/ai", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            messages: updatedMessages,
          }),
        });

      if (!response.ok) {
        throw new Error(
          "Failed to generate response."
        );
      }

      const data =
        await response.json();

      const assistantMessage: Message =
        {
          id: crypto.randomUUID(),

          role: "assistant",

          content:
            data.reply ??
            "Sorry, I couldn't generate a response.",
        };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong."
      );

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),

          role: "assistant",

          content:
            "⚠️ Sorry, I'm currently unavailable. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([
      {
        id: crypto.randomUUID(),

        role: "assistant",

        content:
          "👋 Welcome back! How can I help you today?",
      },
    ]);
  }

  return {
    messages,

    input,

    setInput,

    loading,

    error,

    sendMessage,

    clearChat,

    suggestedQuestions:
      DEFAULT_SUGGESTIONS,

    hasMessages:
      messages.length > 1,
  };
}