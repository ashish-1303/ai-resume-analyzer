interface ScoreCircleProps {
  score: number;
}
export const ScoreCircle = ({ score }: ScoreCircleProps) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const background = `conic-gradient(#2FBF9B ${clampedScore * 3.6}deg, rgba(23, 32, 38, 0.1) 0deg)`;

  return (
    <div className="flex shrink-0 items-center gap-4 rounded-lg border border-ink/10 bg-[#fbfcf8] p-4">
      <div className="grid h-24 w-24 place-items-center rounded-full" style={{ background }}>
        <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-xl font-black text-ink">{clampedScore}</div>
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-normal text-ink/50">ATS score</p>
        <p className="mt-1 text-sm leading-6 text-ink/60">Higher scores mean better parsing and keyword alignment.</p>
      </div>
    </div>
  );
};
