export const missionStorageKey = "operacao-borahae-progress";

export type StoredMissionProgress = {
  started: boolean;
  completedFolderIds: string[];
  activeFolderId: string | null;
  ratifiedTreaties: Record<string, string[]>;
};

export const defaultMissionProgress: StoredMissionProgress = {
  started: false,
  completedFolderIds: [],
  activeFolderId: null,
  ratifiedTreaties: {},
};

export function readMissionProgress() {
  if (typeof window === "undefined") {
    return defaultMissionProgress;
  }

  try {
    const stored = window.localStorage.getItem(missionStorageKey);

    if (!stored) {
      return defaultMissionProgress;
    }

    return {
      ...defaultMissionProgress,
      ...JSON.parse(stored),
    } as StoredMissionProgress;
  } catch {
    return defaultMissionProgress;
  }
}

export function writeMissionProgress(progress: StoredMissionProgress) {
  window.localStorage.setItem(missionStorageKey, JSON.stringify(progress));
}

export function clearMissionProgress() {
  window.localStorage.removeItem(missionStorageKey);
}
