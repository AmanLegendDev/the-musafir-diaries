"use client";

import {
  Baby,
} from "lucide-react";

interface ChildrenAgesProps {
  count: number;
  ages: number[];
  onChange: (
    index: number,
    age: number,
  ) => void;
}

export default function ChildrenAges({
  count,
  ages,
  onChange,
}: ChildrenAgesProps) {
  if (count <= 0) {
    return null;
  }

  return (
    <div className="rounded-[22px] border border-[#071A33]/10 bg-[#FAF9F5] p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F59E0B]/10 text-[#F59E0B]">
          <Baby size={17} />
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#071A33]">
            Children&apos;s ages
          </h4>

          <p className="mt-1 text-xs leading-5 text-[#071A33]/45">
            Required for accurate child pricing.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {Array.from({
          length: count,
        }).map((_, index) => (
          <label
            key={index}
            className="block"
          >
            <span className="mb-2 block text-xs font-medium text-[#071A33]/55">
              Child {index + 1} age
            </span>

            <div className="relative">
              <input
                type="number"
                min={0}
                max={17}
                value={
                  ages[index] ?? ""
                }
                onChange={(event) => {
                  const raw =
                    event.target.value;

                  if (raw === "") {
                    onChange(
                      index,
                      0,
                    );

                    return;
                  }

                  const value =
                    Number(raw);

                  onChange(
                    index,
                    Math.min(
                      17,
                      Math.max(
                        0,
                        value,
                      ),
                    ),
                  );
                }}
                className="
                  min-h-[50px] w-full
                  rounded-2xl
                  border border-[#071A33]/10
                  bg-white
                  px-4 py-3
                  text-sm font-medium
                  text-[#071A33]
                  outline-none
                  transition
                  hover:border-[#071A33]/20
                  focus:border-[#087E8B]
                  focus:ring-4
                  focus:ring-[#087E8B]/10
                "
                aria-label={`Child ${index + 1} age`}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}