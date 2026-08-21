"use client";

import { Check, ScrollText } from "lucide-react";
import type { TreatiesChallenge as TreatiesChallengeType } from "@/data/mission";
import { Stamp } from "./Stamp";

type TreatiesChallengeProps = {
  challenge: TreatiesChallengeType;
  ratifiedTreaties: string[];
  isCompleted: boolean;
  onRatify: (treaty: string) => void;
};

export function TreatiesChallenge({
  challenge,
  ratifiedTreaties,
  isCompleted,
  onRatify,
}: TreatiesChallengeProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-3">
        {challenge.treaties.map((treaty) => {
          const isRatified = ratifiedTreaties.includes(treaty);

          return (
            <button
              type="button"
              key={treaty}
              onClick={() => onRatify(treaty)}
              disabled={isRatified}
              aria-pressed={isRatified}
              className={`flex min-h-16 items-center justify-between gap-3 rounded-md border p-3 text-left transition sm:gap-4 sm:p-4 ${
                isRatified
                  ? "border-emerald-200/45 bg-emerald-200/10 text-emerald-50"
                  : "border-violet-200/20 bg-white/[0.055] text-violet-50 hover:border-amber-200/50 hover:bg-white/[0.08]"
              }`}
            >
              <span className="flex min-w-0 items-center gap-3">
                <ScrollText
                  className="h-5 w-5 shrink-0 text-amber-100"
                  aria-hidden="true"
                />
                <span className="min-w-0 text-sm font-medium leading-6 sm:text-base">
                  {treaty}
                </span>
              </span>
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                  isRatified
                    ? "border-emerald-100 bg-emerald-100 text-violet-950"
                    : "border-violet-200/25 text-violet-100/45"
                }`}
                aria-hidden="true"
              >
                {isRatified && <Check className="h-4 w-4" />}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-violet-100/65">
        Ratificados: {ratifiedTreaties.length}/{challenge.treaties.length}
      </p>

      {isCompleted && (
        <div className="space-y-3">
          <Stamp>APROVADO</Stamp>
          <p className="text-sm leading-6 text-emerald-100">
            Todos os tratados foram ratificados. A amizade segue em plena
            vigência internacional.
          </p>
        </div>
      )}
    </div>
  );
}
