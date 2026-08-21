"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { missionConfig } from "@/data/mission";
import {
  clearMissionProgress,
  defaultMissionProgress,
  readMissionProgress,
  type StoredMissionProgress,
  writeMissionProgress,
} from "@/lib/storage";
import { MissionDashboard } from "./MissionDashboard";
import { MissionIntro } from "./MissionIntro";

type FolderStatus = "locked" | "unlocked" | "completed";

export function MissionExperience() {
  const [progress, setProgress] = useState<StoredMissionProgress>(() =>
    readMissionProgress(),
  );
  const [toast, setToast] = useState("");
  const titleClicks = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    writeMissionProgress(progress);
  }, [progress]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current);
      }
    };
  }, []);

  const activeFolder = useMemo(() => {
    return (
      missionConfig.folders.find(
        (folder) => folder.id === progress.activeFolderId,
      ) ?? missionConfig.folders[0]
    );
  }, [progress.activeFolderId]);

  function showToast(message: string) {
    setToast(message);

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => setToast(""), 3600);
  }

  function startMission() {
    setProgress((current) => ({
      ...current,
      started: true,
      activeFolderId: current.activeFolderId ?? missionConfig.folders[0].id,
    }));
  }

  function getFolderStatus(folderId: string): FolderStatus {
    if (progress.completedFolderIds.includes(folderId)) {
      return "completed";
    }

    const folderIndex = missionConfig.folders.findIndex(
      (folder) => folder.id === folderId,
    );

    if (!progress.started) {
      return "locked";
    }

    if (folderIndex === 0) {
      return "unlocked";
    }

    const previousFolder = missionConfig.folders[folderIndex - 1];
    return progress.completedFolderIds.includes(previousFolder.id)
      ? "unlocked"
      : "locked";
  }

  function openFolder(folderId: string) {
    if (getFolderStatus(folderId) === "locked") {
      return;
    }

    setProgress((current) => ({
      ...current,
      activeFolderId: folderId,
    }));
  }

  function completeFolder(folderId: string) {
    setProgress((current) => {
      if (current.completedFolderIds.includes(folderId)) {
        return current;
      }

      return {
        ...current,
        completedFolderIds: [...current.completedFolderIds, folderId],
      };
    });
  }

  function ratifyTreaty(folderId: string, treaty: string) {
    setProgress((current) => {
      const currentTreaties = current.ratifiedTreaties[folderId] ?? [];

      if (currentTreaties.includes(treaty)) {
        return current;
      }

      const nextTreaties = [...currentTreaties, treaty];
      const folder = missionConfig.folders.find((item) => item.id === folderId);
      const shouldComplete =
        folder?.challenge.type === "treaties" &&
        nextTreaties.length === folder.challenge.treaties.length;

      return {
        ...current,
        completedFolderIds:
          shouldComplete && !current.completedFolderIds.includes(folderId)
            ? [...current.completedFolderIds, folderId]
            : current.completedFolderIds,
        ratifiedTreaties: {
          ...current.ratifiedTreaties,
          [folderId]: nextTreaties,
        },
      };
    });
  }

  function resetMission() {
    clearMissionProgress();
    setProgress(defaultMissionProgress);
    titleClicks.current = 0;
    showToast("Progresso reiniciado. Dossiê lacrado novamente.");
  }

  function handleTitleClick() {
    titleClicks.current += 1;

    if (titleClicks.current === 7) {
      showToast(missionConfig.easterEggs.ot7);
      titleClicks.current = 0;
    }
  }

  return (
    <>
      {!progress.started ? (
        <MissionIntro onStart={startMission} onTitleClick={handleTitleClick} />
      ) : (
        <MissionDashboard
          activeFolder={activeFolder}
          completedFolderIds={progress.completedFolderIds}
          ratifiedTreaties={progress.ratifiedTreaties}
          getFolderStatus={getFolderStatus}
          onOpenFolder={openFolder}
          onCompleteFolder={completeFolder}
          onRatifyTreaty={ratifyTreaty}
          onReset={resetMission}
          onEasterEgg={() => showToast(missionConfig.easterEggs.army)}
          onTitleClick={handleTitleClick}
        />
      )}

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="fixed bottom-5 left-1/2 z-50 w-[min(92vw,520px)] -translate-x-1/2 rounded-md border border-amber-100/40 bg-violet-950/95 px-4 py-3 text-center text-sm font-semibold text-amber-50 shadow-2xl shadow-black/35"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
