"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FileLock2, FolderOpen, LockKeyhole } from "lucide-react";
import type { MissionFolder } from "@/data/mission";

type FolderStatus = "locked" | "unlocked" | "completed";

type FolderCardProps = {
  folder: MissionFolder;
  status: FolderStatus;
  isActive: boolean;
  onOpen: () => void;
};

export function FolderCard({
  folder,
  status,
  isActive,
  onOpen,
}: FolderCardProps) {
  const isLocked = status === "locked";
  const statusLabel = {
    locked: "Bloqueada",
    unlocked: "Desbloqueada",
    completed: "Concluída",
  }[status];

  const Icon =
    status === "completed" ? CheckCircle2 : isLocked ? LockKeyhole : FolderOpen;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      disabled={isLocked}
      whileHover={isLocked ? undefined : { y: -3 }}
      whileTap={isLocked ? undefined : { scale: 0.98 }}
      aria-label={`${folder.code}: ${folder.title}. Status: ${statusLabel}`}
      className={`group min-h-[190px] w-[78vw] max-w-[330px] shrink-0 rounded-md border p-3 text-left transition sm:min-h-[210px] sm:p-4 lg:min-h-0 lg:w-full lg:max-w-none ${
        isActive
          ? "border-amber-200/70 bg-amber-100/10 shadow-lg shadow-violet-950/30"
          : "border-violet-200/15 bg-white/[0.055]"
      } ${
        isLocked
          ? "cursor-not-allowed opacity-50"
          : "hover:border-violet-200/45 hover:bg-white/[0.085]"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className="rounded-sm border border-violet-200/20 bg-violet-950/60 px-2 py-1 font-mono text-[0.66rem] uppercase tracking-[0.2em] text-violet-100/70">
          {folder.code}
        </span>
        <Icon
          className={`h-5 w-5 ${
            status === "completed" ? "text-emerald-200" : "text-amber-100"
          }`}
          aria-hidden="true"
        />
      </div>

      <h3 className="text-[0.95rem] font-semibold leading-6 text-white sm:text-base">
        {folder.title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-violet-100/70 sm:text-sm sm:leading-6">
        {folder.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.14em] text-violet-100/60 sm:text-xs sm:tracking-[0.18em]">
          <FileLock2 className="h-3.5 w-3.5" aria-hidden="true" />
          {statusLabel}
        </span>
        {!isLocked && (
          <span className="text-xs font-medium text-amber-100">
            Abrir pasta
          </span>
        )}
      </div>
    </motion.button>
  );
}
