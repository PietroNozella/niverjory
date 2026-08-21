type ProgressBarProps = {
  completed: number;
  total: number;
};

export function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div aria-label={`Progresso da missão: ${percent}%`} className="space-y-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.22em] text-violet-100/70">
        <span>Progresso da missão</span>
        <span>
          {completed}/{total}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full border border-violet-200/20 bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-300 via-fuchsia-300 to-amber-200 transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
