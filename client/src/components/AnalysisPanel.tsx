import type { ReactNode } from "react";
import { CheckCircle2, ClipboardList, Lightbulb, Search, Target, TrendingUp } from "lucide-react";
import type { ResumeAnalysisResult } from "../types/analysis";
import { ScoreCircle } from "./ScoreCircle";

interface AnalysisPanelProps {
  analysis: ResumeAnalysisResult | null;
  fileName?: string;
  isLoading: boolean;
}

export const AnalysisPanel = ({ analysis, fileName, isLoading }: AnalysisPanelProps) => {
  if (isLoading) {
    return (
      <section className="flex min-h-[520px] items-center justify-center rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-pulse rounded-full bg-mint/20" />
          <h2 className="text-xl font-bold text-ink">Reading the resume</h2>
          <p className="mt-2 text-sm leading-6 text-ink/60">Gemini is checking ATS fit, keywords, structure, and impact.</p>
        </div>
      </section>
    );
  }

  if (!analysis) {
    return (
      <section className="flex min-h-[520px] items-center justify-center rounded-lg border border-ink/10 bg-white p-6 shadow-sm">
        <div className="max-w-md text-center">
          <ClipboardList className="mx-auto h-14 w-14 text-mint" />
          <h2 className="mt-5 text-2xl font-bold text-ink">Your analysis will appear here</h2>
          <p className="mt-3 text-sm leading-6 text-ink/60">
            Upload a resume to see the ATS score, strengths, gaps, and exact fixes that can improve recruiter readability.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 border-b border-ink/10 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium text-ink/50">{fileName}</p>
          <h2 className="mt-1 text-2xl font-bold text-ink">Resume report</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/65">{analysis.summary}</p>
        </div>
        <ScoreCircle score={analysis.atsScore} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <InfoBlock icon={<Target />} title="Role fit" items={[analysis.roleFit]} />
        <InfoBlock icon={<TrendingUp />} title="Priority fixes" items={analysis.priorityFixes} accent="coral" />
        <InfoBlock icon={<CheckCircle2 />} title="Strengths" items={analysis.strengths} accent="mint" />
        <InfoBlock icon={<Lightbulb />} title="Improvements" items={analysis.improvements} accent="amber" />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-ink/10 p-4">
          <div className="mb-4 flex items-center gap-2">
            <Search className="h-5 w-5 text-mint" />
            <h3 className="text-base font-bold text-ink">Score breakdown</h3>
          </div>
          <div className="space-y-4">
            {analysis.scoreBreakdown.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                  <span className="font-semibold text-ink">{item.category}</span>
                  <span className="font-bold text-ink">{item.score}/100</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                  <div className="h-full rounded-full bg-mint" style={{ width: `${item.score}%` }} />
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/60">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <TagBlock title="Missing keywords" values={analysis.missingKeywords} />
          <TagBlock title="Missing sections" values={analysis.missingSections} tone="coral" />
        </div>
      </div>
    </section>
  );
};

interface InfoBlockProps {
  icon: ReactNode;
  title: string;
  items: string[];
  accent?: "mint" | "coral" | "amber";
}

const accentClasses = {
  mint: "text-mint bg-mint/10",
  coral: "text-coral bg-coral/10",
  amber: "text-amber bg-amber/10"
};

const InfoBlock = ({ icon, title, items, accent = "mint" }: InfoBlockProps) => (
  <div className="rounded-lg border border-ink/10 p-4">
    <div className="mb-3 flex items-center gap-2">
      <span className={`rounded-md p-2 ${accentClasses[accent]}`}>{icon}</span>
      <h3 className="text-base font-bold text-ink">{title}</h3>
    </div>
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="text-sm leading-6 text-ink/65">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const TagBlock = ({ title, values, tone = "mint" }: { title: string; values: string[]; tone?: "mint" | "coral" }) => (
  <div className="rounded-lg border border-ink/10 p-4">
    <h3 className="mb-3 text-base font-bold text-ink">{title}</h3>
    {values.length ? (
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span
            key={value}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              tone === "mint" ? "bg-mint/10 text-ink" : "bg-coral/10 text-ink"
            }`}
          >
            {value}
          </span>
        ))}
      </div>
    ) : (
      <p className="text-sm text-ink/60">No major gaps found.</p>
    )}
  </div>
);
