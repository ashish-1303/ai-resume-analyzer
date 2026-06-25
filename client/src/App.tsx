import { useState } from "react";
import { AlertCircle, BadgeCheck, FileText, Loader2, Sparkles, UploadCloud } from "lucide-react";
import { analyzeResume } from "./api/analysis";
import { AnalysisPanel } from "./components/AnalysisPanel";
import { FileUpload } from "./components/FileUpload";
import { getErrorMessage } from "./utils/error";
import type { AnalysisResponse } from "./types/analysis";

export const App = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Choose a PDF, DOCX, or TXT resume first.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await analyzeResume(selectedFile);
      setAnalysis(result);
    } catch (caughtError) {
      setError(getErrorMessage(caughtError));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 rounded-lg border border-ink/10 bg-white px-5 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-sm font-medium text-ink">
              <Sparkles className="h-4 w-4 text-mint" />
              Gemini AI resume review
            </div>
            <h1 className="text-3xl font-bold tracking-normal text-ink sm:text-4xl">AI Resume Analyzer</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/70 sm:text-base">
              Upload a resume and get an ATS score, targeted improvements, missing keywords, and priority fixes.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold text-ink/70 sm:min-w-80">
            <div className="rounded-lg border border-ink/10 bg-[#eef8f4] px-3 py-3">
              <UploadCloud className="mx-auto mb-1 h-5 w-5 text-mint" />
              Upload
            </div>
            <div className="rounded-lg border border-ink/10 bg-[#fff7e5] px-3 py-3">
              <FileText className="mx-auto mb-1 h-5 w-5 text-amber" />
              Extract
            </div>
            <div className="rounded-lg border border-ink/10 bg-[#fff0ee] px-3 py-3">
              <BadgeCheck className="mx-auto mb-1 h-5 w-5 text-coral" />
              Improve
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <aside className="rounded-lg border border-ink/10 bg-white p-5 shadow-sm">
            <FileUpload selectedFile={selectedFile} onFileSelect={setSelectedFile} disabled={isLoading} />

            {error && (
              <div className="mt-4 flex gap-3 rounded-lg border border-coral/30 bg-coral/10 p-3 text-sm text-ink">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isLoading}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/50"
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              {isLoading ? "Analyzing resume" : "Analyze resume"}
            </button>
          </aside>

          <AnalysisPanel analysis={analysis?.result ?? null} fileName={analysis?.fileName} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
};
