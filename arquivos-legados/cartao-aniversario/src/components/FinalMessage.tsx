"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { RotateCcw, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { missionConfig } from "@/data/mission";
import { Stamp } from "./Stamp";

type FinalMessageProps = {
  onComplete: () => void;
  onRestart: () => void;
};

export function FinalMessage({ onComplete, onRestart }: FinalMessageProps) {
  const didCelebrate = useRef(false);

  useEffect(() => {
    if (didCelebrate.current) {
      return;
    }

    didCelebrate.current = true;
    onComplete();

    const defaults = {
      spread: 65,
      ticks: 80,
      gravity: 0.85,
      colors: ["#c4b5fd", "#f5d0fe", "#fde68a", "#ffffff"],
    };

    confetti({ ...defaults, particleCount: 90, origin: { x: 0.2, y: 0.75 } });
    confetti({ ...defaults, particleCount: 90, origin: { x: 0.8, y: 0.75 } });
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <Stamp tone="complete">MISSÃO CONCLUÍDA</Stamp>
        <span className="inline-flex items-center gap-2 text-sm text-amber-100">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Comunicado liberado
        </span>
      </div>

      <div className="space-y-5 rounded-md border border-amber-100/30 bg-white/[0.065] p-4 text-sm leading-7 text-violet-50 sm:p-7 sm:text-base sm:leading-8">
        {missionConfig.finalMessage.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-violet-200/30 bg-violet-950/55 px-5 text-sm font-bold text-violet-50 transition hover:border-amber-100/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-100/60 sm:w-auto"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Reiniciar missão
      </button>
    </motion.div>
  );
}
