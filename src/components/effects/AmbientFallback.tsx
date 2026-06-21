import type { CSSProperties } from "react";

type AmbientFallbackProps = {
  reducedMotion: boolean;
};

const particles = Array.from({ length: 34 }, (_, index) => index);

export default function AmbientFallback({ reducedMotion }: AmbientFallbackProps) {
  return (
    <div className="ambient-fallback" data-reduced-motion={reducedMotion} aria-hidden="true">
      <div className="aurora-field" />
      <div className="soft-depth" />
      <div className="fallback-particles">
        {particles.map((particle) => (
          <span key={particle} style={{ "--particle-index": particle } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

