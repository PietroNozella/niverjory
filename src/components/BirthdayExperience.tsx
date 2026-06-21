import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { birthdayMessage } from "../data/birthdayMessage";
import { useVisualMode } from "../hooks/useVisualMode";
import AmbientFallback from "./effects/AmbientFallback";

const birthdayParticleColors = ["#fff0ca", "#ffb649", "#ff5f8f", "#2ec4b6"];
const birthdayPhotos = [
  "/birthday-photos/01.jpeg",
  "/birthday-photos/02.jpeg",
  "/birthday-photos/03.jpeg",
  "/birthday-photos/04.jpeg",
];
const OrbitImages = lazy(() => import("./effects/OrbitImages"));
const Particles = lazy(() => import("./effects/Particles"));

export default function BirthdayExperience() {
  const { prefersReducedMotion, isCompactViewport, isLowPowerDevice } = useVisualMode();
  const showParticleScene = !prefersReducedMotion && !isLowPowerDevice;

  return (
    <main className="message-stage relative min-h-svh overflow-hidden text-[#fff8ec]">
      {showParticleScene ? (
        <Suspense fallback={<AmbientFallback reducedMotion={prefersReducedMotion} />}>
          <Particles
            className="birthday-particles"
            particleColors={birthdayParticleColors}
            particleCount={isCompactViewport ? 260 : 420}
            particleSpread={isCompactViewport ? 8 : 11}
            speed={0.12}
            particleBaseSize={isCompactViewport ? 76 : 92}
            sizeRandomness={1.25}
            cameraDistance={isCompactViewport ? 20 : 18}
            alphaParticles
            moveParticlesOnHover={!isCompactViewport}
            particleHoverFactor={0.55}
          />
        </Suspense>
      ) : (
        <AmbientFallback reducedMotion={prefersReducedMotion} />
      )}

      <div className="light-texture" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />

      {!isCompactViewport ? (
        <Suspense fallback={null}>
          <OrbitImages
            className="birthday-orbit"
            images={birthdayPhotos}
            shape="ellipse"
            baseWidth={1400}
            radiusX={620}
            radiusY={330}
            rotation={-7}
            duration={34}
            itemSize={112}
            responsive
            paused={prefersReducedMotion}
          />
        </Suspense>
      ) : null}

      <section className="relative z-10 mx-auto flex min-h-svh w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center sm:px-10">
        <motion.div
          className="message-kicker mb-8 h-px w-40"
          initial={false}
          animate={prefersReducedMotion ? undefined : { scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.h1
          className="font-display text-[clamp(3.2rem,10vw,9.5rem)] font-semibold leading-[0.92] tracking-normal text-balance"
          initial={false}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {birthdayMessage.title}
        </motion.h1>

        <motion.p
          className="mt-8 max-w-2xl text-pretty text-base leading-8 text-[#f8e8cf]/86 sm:mt-10 sm:text-xl sm:leading-9"
          initial={false}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
        >
          {birthdayMessage.body}
        </motion.p>

        <motion.div
          className="celebration-glow mt-12 h-24 w-full max-w-3xl"
          aria-hidden="true"
          initial={false}
          animate={prefersReducedMotion ? undefined : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
      </section>
    </main>
  );
}
