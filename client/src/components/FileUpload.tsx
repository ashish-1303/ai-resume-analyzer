import { useRef, useState } from "react";
import { File, UploadCloud, X } from "lucide-react";
import clsx from "clsx";

interface FileUploadProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  disabled?: boolean;
}

const acceptedTypes = ".pdf,.docx,.txt";

export const FileUpload = ({ selectedFile, onFileSelect, disabled }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const selectFile = (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <label className="text-sm font-semibold text-ink">Resume file</label>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          selectFile(event.dataTransfer.files);
        }}
        className={clsx(
          "mt-3 flex min-h-60 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 text-center transition",
          isDragging ? "border-mint bg-mint/10" : "border-ink/15 bg-[#fbfcf8] hover:border-mint/70",
          disabled && "cursor-not-allowed opacity-70"
        )}
      >
        <UploadCloud className="h-12 w-12 text-mint" />
        <span className="mt-4 text-base font-semibold text-ink">Drop resume here or browse</span>
        <span className="mt-2 text-sm leading-6 text-ink/60">PDF, DOCX, or TXT up to 5 MB</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={acceptedTypes}
        className="hidden"
        disabled={disabled}
        onChange={(event) => selectFile(event.target.files)}
      />

      {selectedFile && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-ink/10 bg-white p-3">
          <File className="h-5 w-5 shrink-0 text-mint" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{selectedFile.name}</p>
            <p className="text-xs text-ink/50">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            type="button"
            aria-label="Remove selected file"
            disabled={disabled}
            onClick={() => onFileSelect(null)}
            className="rounded-md p-2 text-ink/60 transition hover:bg-ink/5 hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};
