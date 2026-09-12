"use client";

import { Check, UserRound, Map, ClipboardCheck } from "lucide-react";
import { motion } from "framer-motion";

interface BookingProgressProps {
  currentStep: number;
}

const steps = [
  {
    number: 1,
    label: "Traveller",
    description: "Your details",
    icon: UserRound,
  },
  {
    number: 2,
    label: "Journey",
    description: "Travel plans",
    icon: Map,
  },
  {
    number: 3,
    label: "Review",
    description: "Check everything",
    icon: ClipboardCheck,
  },
];

export default function BookingProgress({
  currentStep,
}: BookingProgressProps) {
  return (
    <div className="border-b border-[#071A33]/10 bg-[#FAF9F5]">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-start">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const active = currentStep === step.number;
              const completed = currentStep > step.number;

              return (
                <div
                  key={step.number}
                  className="flex min-w-0 flex-1 items-start"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: active ? 1 : 0.96,
                      }}
                      className={`
                        flex h-11 w-11 shrink-0 items-center justify-center
                        rounded-full border transition-all duration-300
                        ${
                          active
                            ? "border-[#087E8B] bg-[#087E8B] text-white shadow-lg shadow-[#087E8B]/20"
                            : completed
                              ? "border-[#087E8B] bg-[#087E8B]/10 text-[#087E8B]"
                              : "border-[#071A33]/15 bg-white text-[#071A33]/35"
                        }
                      `}
                    >
                      {completed ? (
                        <Check size={18} strokeWidth={2.5} />
                      ) : (
                        <Icon size={18} />
                      )}
                    </motion.div>

                    <div className="hidden min-w-0 sm:block">
                      <p
                        className={`truncate text-sm font-semibold ${
                          active || completed
                            ? "text-[#071A33]"
                            : "text-[#071A33]/40"
                        }`}
                      >
                        {step.label}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-[#071A33]/40">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index !== steps.length - 1 && (
                    <div className="mx-3 mt-5 h-px flex-1 bg-[#071A33]/10 sm:mx-5">
                      <motion.div
                        initial={false}
                        animate={{
                          scaleX: completed ? 1 : 0,
                        }}
                        transition={{ duration: 0.45 }}
                        className="h-full origin-left bg-[#087E8B]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}