"use client";

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";

interface DestinationSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export default function DestinationSearch({
  search,
  setSearch,
}: DestinationSearchProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,

        
      }}

      
     className="
sticky
top-20
z-30

w-full

bg-slate-50/90
backdrop-blur-md

pb-4
"
    >
      {/* Search Icon */}

     <motion.div
  animate={{
    scale: search ? 1.1 : 1,
    rotate: search ? 8 : 0,

    
  }}
  transition={{
    duration: 0.2,
  }}
  whileInView={{
  opacity: 1,
  y: 0,
}}

whileHover={{
  scale: 1.005,
}}
  className="absolute left-5 top-1/2 -translate-y-1/2"
>
  <Search
  className={`h-5 w-5 ${
    search
      ? "text-emerald-600"
      : "text-slate-400"
  }`}
/>
</motion.div>

      {/* Input */}

      <input
        type="text"
        placeholder={
  search
    ? "Searching destinations..."
    : "Search destinations..."
}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          pl-14
          pr-14
          text-slate-800
          shadow-sm
          outline-none
          transition-all
          duration-300
          placeholder:text-slate-400
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-100
        "
      />

      {/* Clear Button */}

      {search && (
     <motion.button
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  exit={{ scale: 0 }}
  whileTap={{ scale: 0.9 }}
  type="button"
  onClick={() => {
  setSearch("");
}}
  className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    rounded-full
    bg-slate-100
    p-2
    transition
    hover:bg-slate-200
  "
>
  <X className="h-4 w-4 text-slate-600" />
</motion.button>
      )}
    </motion.div>
  );
}