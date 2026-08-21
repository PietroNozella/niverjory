"use client";

import { Vote } from "lucide-react";
import type { VoteChallenge as VoteChallengeType } from "@/data/mission";
import { Stamp } from "./Stamp";

type VoteChallengeProps = {
  challenge: VoteChallengeType;
  isCompleted: boolean;
  onComplete: () => void;
};

export function VoteChallenge({
  challenge,
  isCompleted,
  onComplete,
}: VoteChallengeProps) {
  return (
    <div className="space-y-5">
      <div className="rounded-md border border-violet-200/20 bg-violet-950/45 p-4 sm:p-5">
        <p className="text-[0.68rem] uppercase tracking-[0.16em] text-violet-100/55 sm:text-sm sm:tracking-[0.2em]">
          Resolução em votação
        </p>
        <p className="mt-3 text-base font-semibold leading-7 text-white sm:text-lg sm:leading-8">
          {challenge.resolution}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {challenge.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={onComplete}
            disabled={isCompleted}
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md border border-amber-100/40 bg-amber-100 px-4 text-center text-sm font-bold leading-5 text-violet-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100/70 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Vote className="h-4 w-4" aria-hidden="true" />
            {option}
          </button>
        ))}
      </div>

      {isCompleted && (
        <div className="space-y-3">
          <Stamp>APROVADO</Stamp>
          <p className="text-sm leading-6 text-emerald-100">
            {challenge.result}
          </p>
        </div>
      )}
    </div>
  );
}
