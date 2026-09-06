"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";

interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    ) as HTMLHeadingElement[];

    const items = elements.map((heading) => {
      if (!heading.id) {
        heading.id = heading.innerText
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      }

      return {
        id: heading.id,
        text: heading.innerText,
      };
    });

    setHeadings(items);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-30% 0px -60% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-emerald-100 p-3">

          <ListTree className="h-5 w-5 text-emerald-600" />

        </div>

        <div>

          <h3 className="font-bold text-slate-900">
            Table of Contents
          </h3>

          <p className="text-sm text-slate-500">
            Jump to a section
          </p>

        </div>

      </div>

      <nav>

        <ul className="space-y-3">

          {headings.map((heading) => (

            <li key={heading.id}>

              <a
                href={`#${heading.id}`}
                className={`block rounded-lg px-3 py-2 text-sm transition ${
                  activeId === heading.id
                    ? "bg-emerald-50 font-semibold text-emerald-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                }`}
              >
                {heading.text}
              </a>

            </li>

          ))}

        </ul>

      </nav>

    </div>
  );
}