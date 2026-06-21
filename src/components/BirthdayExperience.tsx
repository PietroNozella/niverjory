import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { birthdayMessage } from "../data/birthdayMessage";
import { useVisualMode } from "../hooks/useVisualMode";
import AmbientFallback from "./effects/AmbientFallback";

const CosmicScene = lazy(() => import("./effects/CosmicScene"));

export default function BirthdayExperience() {
  const { prefersReducedMotion, shouldUseFallback } = useVisualMode();
  const showHeavyScene = !shouldUseFallback;

  return (
    <main className="message-stage relative min-h-svh overflow-hidden text-[#fff8ec]">
      {showHeavyScene ? (
        <Suspense fallback={<AmbientFallback reducedMotion={prefersReducedMotion} />}>
          <CosmicScene />
        </Suspense>
      ) : (
        <AmbientFallback reducedMotion={prefersReducedMotion} />
      )}

      <div className="light-texture" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />

      <section className="relative z-10 mx-auto flex min-h-svh w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
        <motion.div
          className="message-kicker mb-8 h-px w-40"
          initial={prefersReducedMotion ? false : { scaleX: 0, opacity: 0 }}
          animate={prefersReducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.h1
          className="font-display text-[clamp(3.2rem,10vw,9.5rem)] font-semibold leading-[0.92] tracking-normal text-balance"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 36, filter: "blur(18px)" }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {birthdayMessage.title}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-2xl text-pretty text-base leading-8 text-[#f8e8cf]/86 sm:mt-10 sm:text-xl sm:leading-9"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
        >
          {birthdayMessage.body}
        </motion.p>

        <motion.div
          className="celebration-glow mt-12 h-24 w-full max-w-3xl"
          aria-hidden="true"
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0.72 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
      </section>
    </main>
  );
}

