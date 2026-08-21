"use client";

import { FormEvent, useState } from "react";
import { SendHorizontal } from "lucide-react";
import type { TextChallenge } from "@/data/mission";
import { isAcceptedAnswer, normalizeAnswer } from "@/lib/text";
import { Stamp } from "./Stamp";

type ChallengeInputProps = {
  challenge: TextChallenge;
  isCompleted: boolean;
  onComplete: () => void;
  onEasterEgg: () => void;
};

export function ChallengeInput({
  challenge,
  isCompleted,
  onComplete,
  onEasterEgg,
}: ChallengeInputProps) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  function handleChange(value: string) {
    setAnswer(value);
    setError("");

    if (normalizeAnswer(value) === "army") {
      onEasterEgg();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isAcceptedAnswer(answer, challenge.acceptedAnswers)) {
      setError("");
      onComplete();
      return;
    }

    setError("Resposta não reconhecida pelo protocolo diplomático.");
  }

  return (
    <div className="space-y-5">
      {challenge.encryptedMessage && (
        <div className="rounded-md border border-violet-200/20 bg-violet-950/45 p-4">
          <p className="mb-2 text-[0.68rem] uppercase tracking-[0.16em] text-violet-100/55 sm:text-xs sm:tracking-[0.2em]">
            Mensagem interceptada
          </p>
          <p className="break-words font-mono text-lg text-amber-100 sm:text-xl">
            {challenge.encryptedMessage}
          </p>
        </div>
      )}

      {challenge.hint && (
        <p className="border-l-2 border-amber-200/60 pl-4 text-sm leading-6 text-violet-50/80">
          {challenge.hint}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="mission-answer"
          className="block text-sm font-medium text-violet-50"
        >
          {challenge.question}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="mission-answer"
            value={answer}
            onChange={(event) => handleChange(event.target.value)}
            disabled={isCompleted}
            className="min-h-12 min-w-0 flex-1 rounded-md border border-violet-200/25 bg-violet-950/70 px-4 text-violet-50 outline-none transition placeholder:text-violet-100/35 focus:border-amber-200/80 focus:ring-2 focus:ring-amber-200/25 disabled:opacity-60"
            placeholder="Digite sua resposta confidencial"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={isCompleted}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-amber-100 px-5 text-sm font-bold text-violet-950 transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-100/70 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden="true" />
            Enviar
          </button>
        </div>
        {error && (
          <p role="alert" className="text-sm text-rose-200">
            {error}
          </p>
        )}
      </form>

      {isCompleted && (
        <div className="space-y-3">
          <Stamp>APROVADO</Stamp>
          <p className="text-sm leading-6 text-emerald-100">
            {challenge.successMessage}
          </p>
        </div>
      )}
    </div>
  );
}
