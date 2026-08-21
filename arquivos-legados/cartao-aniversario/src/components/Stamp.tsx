"use client";

import { motion } from "framer-motion";

type StampProps = {
  children: string;
  tone?: "approved" | "complete";
};

export function Stamp({ children, tone = "approved" }: StampProps) {
  const color =
    tone === "complete"
      ? "border-amber-200 text-amber-100 shadow-amber-300/20"
      : "border-emerald-200 text-emerald-100 shadow-emerald-300/20";

  return (
    <motion.div
      initial={{ opacity: 0, rotate: -12, scale: 1.45 }}
      animate={{ opacity: 1, rotate: -6, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={`inline-flex rounded-sm border-2 px-4 py-2 font-mono text-sm font-black uppercase tracking-[0.22em] shadow-lg ${color}`}
    >
      {children}
    </motion.div>
  );
}
