"use client";

import { Sparkles } from "lucide-react";
import { SuggestedQuestion } from "@/types/ai";

interface SuggestedQuestionsProps {
  questions: SuggestedQuestion[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
  disabled = false,
}: SuggestedQuestionsProps) {
  if (!questions.length) {
    return null;
  }

  return (
    <div className="border-b border-slate-200 bg-slate-50 px-4 py-4">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-emerald-600" />

        <h3 className="text-sm font-semibold text-slate-700">
          Suggested Questions
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question.id}
            type="button"
            disabled={disabled}
            onClick={() =>
              onSelect(question.prompt)
            }
            className="
              rounded-full
              border
              border-slate-200
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-slate-700

              transition-all
              duration-200

              hover:-translate-y-0.5
              hover:border-emerald-500
              hover:bg-emerald-50
              hover:text-emerald-700

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {question.title}
          </button>
        ))}
      </div>
    </div>
  );
}