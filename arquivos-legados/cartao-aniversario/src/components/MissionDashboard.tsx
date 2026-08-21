"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, Shield, Sparkles } from "lucide-react";
import { missionConfig, type MissionFolder } from "@/data/mission";
import { ChallengeInput } from "./ChallengeInput";
import { FinalMessage } from "./FinalMessage";
import { FolderCard } from "./FolderCard";
import { ProgressBar } from "./ProgressBar";
import { TreatiesChallenge } from "./TreatiesChallenge";
import { VoteChallenge } from "./VoteChallenge";

type FolderStatus = "locked" | "unlocked" | "completed";

type MissionDashboardProps = {
  activeFolder: MissionFolder;
  completedFolderIds: string[];
  ratifiedTreaties: Record<string, string[]>;
  getFolderStatus: (folderId: string) => FolderStatus;
  onOpenFolder: (folderId: string) => void;
  onCompleteFolder: (folderId: string) => void;
  onRatifyTreaty: (folderId: string, treaty: string) => void;
  onReset: () => void;
  onEasterEgg: () => void;
  onTitleClick: () => void;
};

export function MissionDashboard({
  activeFolder,
  completedFolderIds,
  ratifiedTreaties,
  getFolderStatus,
  onOpenFolder,
  onCompleteFolder,
  onRatifyTreaty,
  onReset,
  onEasterEgg,
  onTitleClick,
}: MissionDashboardProps) {
  const isCompleted = completedFolderIds.includes(activeFolder.id);

  return (
    <main className="mx-auto min-h-dvh w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">
      <header className="mb-5 rounded-md border border-violet-200/15 bg-violet-950/55 p-4 shadow-xl shadow-black/20 sm:mb-6 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-violet-200/20 bg-white/5 px-3 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-violet-100/70 sm:text-xs sm:tracking-[0.18em]">
              <Shield className="h-4 w-4 text-amber-100" aria-hidden="true" />
              Centro de comando
            </div>
            <button
              type="button"
              onClick={onTitleClick}
              className="block text-left focus:outline-none focus:ring-2 focus:ring-amber-100/60"
              aria-label="Título principal da missão"
            >
              <h1 className="text-[1.7rem] font-black leading-[1.08] text-white sm:text-4xl sm:leading-tight">
                {missionConfig.title}
              </h1>
            </button>
            <p className="mt-2 text-sm leading-6 text-amber-100">
              {missionConfig.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-violet-200/25 bg-white/[0.04] px-4 text-sm font-semibold text-violet-50 transition hover:border-amber-100/60 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-100/60 sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Resetar progresso
          </button>
        </div>

        <div className="mt-6">
          <ProgressBar
            completed={completedFolderIds.length}
            total={missionConfig.folders.length}
          />
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-[390px_1fr] lg:gap-6">
        <section
          aria-label="Pastas da missão"
          className="no-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-2 lg:mx-0 lg:block lg:space-y-3 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {missionConfig.folders.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              status={getFolderStatus(folder.id)}
              isActive={activeFolder.id === folder.id}
              onOpen={() => onOpenFolder(folder.id)}
            />
          ))}
        </section>

        <section
          aria-label="Conteúdo da pasta ativa"
          className="min-h-0 rounded-md border border-violet-200/20 bg-violet-950/60 p-4 shadow-2xl shadow-black/25 sm:p-7 lg:min-h-[560px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFolder.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col gap-4 border-b border-violet-200/15 pb-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-violet-100/55">
                    {activeFolder.code}
                  </p>
                  <h2 className="mt-2 break-words text-[1.55rem] font-black leading-tight text-white sm:text-3xl">
                    {activeFolder.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-violet-100/70">
                    {activeFolder.description}
                  </p>
                </div>

                <div className="w-fit rounded-sm border-2 border-rose-200/50 px-3 py-1 font-mono text-[0.68rem] font-black uppercase tracking-[0.18em] text-rose-100/75 -rotate-2 sm:text-xs sm:tracking-[0.22em]">
                  Classificado
                </div>
              </div>

              {activeFolder.content && (
                <p className="rounded-md border border-violet-200/15 bg-white/[0.045] p-4 text-sm leading-7 text-violet-50/85 sm:text-base">
                  {activeFolder.content}
                </p>
              )}

              {activeFolder.challenge.type === "text" && (
                <ChallengeInput
                  challenge={activeFolder.challenge}
                  isCompleted={isCompleted}
                  onComplete={() => onCompleteFolder(activeFolder.id)}
                  onEasterEgg={onEasterEgg}
                />
              )}

              {activeFolder.challenge.type === "treaties" && (
                <TreatiesChallenge
                  challenge={activeFolder.challenge}
                  ratifiedTreaties={ratifiedTreaties[activeFolder.id] ?? []}
                  isCompleted={isCompleted}
                  onRatify={(treaty) => onRatifyTreaty(activeFolder.id, treaty)}
                />
              )}

              {activeFolder.challenge.type === "vote" && (
                <VoteChallenge
                  challenge={activeFolder.challenge}
                  isCompleted={isCompleted}
                  onComplete={() => onCompleteFolder(activeFolder.id)}
                />
              )}

              {activeFolder.challenge.type === "final" && (
                <FinalMessage
                  onComplete={() => onCompleteFolder(activeFolder.id)}
                  onRestart={onReset}
                />
              )}

              {isCompleted && activeFolder.challenge.type !== "final" && (
                <div className="flex items-start gap-2 rounded-md border border-emerald-200/20 bg-emerald-200/10 p-4 text-sm leading-6 text-emerald-50">
                  <Sparkles className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  Pasta concluída. A próxima etapa foi liberada no painel.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
