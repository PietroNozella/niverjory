"use client";

import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { missionConfig } from "@/data/mission";

type MissionIntroProps = {
  onStart: () => void;
  onTitleClick: () => void;
};

export function MissionIntro({ onStart, onTitleClick }: MissionIntroProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl items-stretch px-4 py-4 sm:items-center sm:px-8 sm:py-10">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="relative flex w-full flex-col justify-center overflow-hidden rounded-md border border-violet-200/20 bg-violet-950/60 p-5 pt-16 shadow-2xl shadow-black/30 sm:block sm:p-10"
      >
        <div className="absolute right-4 top-4 rounded-sm border-2 border-rose-200/60 px-2.5 py-1 font-mono text-[0.65rem] font-black uppercase tracking-[0.18em] text-rose-100/80 rotate-3 sm:right-6 sm:top-6 sm:px-3 sm:text-xs sm:tracking-[0.25em]">
          Classificado
        </div>

        <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-sm border border-violet-200/20 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-violet-100/70 sm:mb-8 sm:text-xs sm:tracking-[0.18em]">
          <ShieldCheck className="h-4 w-4 text-amber-100" aria-hidden="true" />
          Dossiê diplomático
        </div>

        <button
          type="button"
          onClick={onTitleClick}
          className="block max-w-4xl text-left focus:outline-none focus:ring-2 focus:ring-amber-100/60"
          aria-label="Título principal da missão"
        >
          <h1 className="text-[2.15rem] font-black leading-[1.06] text-white sm:text-6xl sm:leading-tight">
            {missionConfig.title}
          </h1>
        </button>

        <p className="mt-4 max-w-2xl text-base leading-7 text-amber-100 sm:text-lg">
          {missionConfig.subtitle}
        </p>
        <p className="mt-6 max-w-2xl text-base leading-7 text-violet-50/85 sm:mt-8 sm:text-lg sm:leading-8">
          {missionConfig.intro}
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-amber-100 px-6 text-sm font-black uppercase tracking-[0.08em] text-violet-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100/70 sm:w-auto"
          >
            <BadgeCheck className="h-4 w-4" aria-hidden="true" />
            Iniciar missão
          </button>
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-violet-100/50">
            Acesso restrito a pessoas incríveis
          </span>
        </div>
      </motion.section>
    </main>
  );
}
