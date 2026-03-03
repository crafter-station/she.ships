"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2, Share2 } from "lucide-react";
import { PosterPreview } from "@/components/poster/poster-preview";
import { PosterControlsPanel } from "@/components/poster/poster-controls-panel";
import { detectFace } from "@/lib/poster/face-detection";
import { exportPoster } from "@/lib/poster/canvas-renderer";
import { useUploadPhoto, useUpdatePoster } from "@/lib/poster/mutations";
import type {
  SpeakerData,
  FaceDetectionResult,
  TemplateType,
  FilterSettings,
} from "@/lib/poster/types";
import { DEFAULT_FILTER, DEFAULT_TEMPLATE } from "@/lib/poster/types";
import type { Poster } from "@/lib/db/schema";

interface PosterEditorProps {
  poster: Poster;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function PosterEditor({ poster }: PosterEditorProps) {
  // ── Editable state ──────────────────────────────────────────────
  const [name, setName] = useState(poster.name);
  const [role, setRole] = useState(poster.role);
  const [template, setTemplate] = useState<TemplateType>(
    (poster.template as TemplateType) || DEFAULT_TEMPLATE
  );
  const [filter, setFilter] = useState<FilterSettings>(DEFAULT_FILTER);

  const speaker: SpeakerData = { name, role };

  // ── Image / detection state ─────────────────────────────────────
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [detection, setDetection] = useState<FaceDetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelStatus, setModelStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");

  const exportCanvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const uploadPhoto = useUploadPhoto(poster.id);
  const updatePoster = useUpdatePoster(poster.id);

  // ── Debounced persistence for name/role ─────────────────────────
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persistNameRole = useCallback(
    (n: string, r: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        updatePoster.mutate({ name: n, role: r });
      }, 500);
    },
    [updatePoster]
  );

  const handleNameChange = useCallback(
    (n: string) => {
      setName(n);
      persistNameRole(n, role);
    },
    [role, persistNameRole]
  );

  const handleRoleChange = useCallback(
    (r: string) => {
      setRole(r);
      persistNameRole(name, r);
    },
    [name, persistNameRole]
  );

  // ── Template change (immediate persist) ─────────────────────────
  const handleTemplateChange = useCallback(
    (t: TemplateType) => {
      setTemplate(t);
      updatePoster.mutate({ template: t });
    },
    [updatePoster]
  );

  // ── Load bg + existing photo on mount ───────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const bgImg = await loadImage("/poster/bg.png");
        if (!cancelled) setBgImage(bgImg);

        if (poster.photoUrl) {
          setIsProcessing(true);
          setModelStatus("loading");
          const img = await loadImage(poster.photoUrl);
          if (cancelled) return;
          setImage(img);
          const result = await detectFace(img);
          if (cancelled) return;
          if (result) {
            setDetection(result);
            setModelStatus("ready");
          } else {
            setModelStatus("error");
          }
          setIsProcessing(false);
        }
      } catch {
        if (!cancelled) {
          setModelStatus("error");
          setIsProcessing(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [poster.photoUrl]);

  // ── Image upload handler ────────────────────────────────────────
  const handleImageUpload = useCallback(
    async (file: File) => {
      setIsProcessing(true);
      setModelStatus("loading");

      const img = new Image();
      img.crossOrigin = "anonymous";
      const url = URL.createObjectURL(file);
      img.src = url;

      img.onload = async () => {
        setImage(img);
        try {
          const result = await detectFace(img);
          if (result) {
            setDetection(result);
            setModelStatus("ready");
            uploadPhoto.mutate(file);
          } else {
            setModelStatus("error");
          }
        } catch {
          setModelStatus("error");
        } finally {
          setIsProcessing(false);
        }
      };

      img.onerror = () => {
        setIsProcessing(false);
        setModelStatus("error");
      };
    },
    [uploadPhoto]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  // ── Export ──────────────────────────────────────────────────────
  const handleExport = useCallback(async () => {
    const canvas = exportCanvasRef.current;
    if (!canvas) return;

    try {
      const blob = await exportPoster(canvas);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.toLowerCase().replace(/\s+/g, "-")}-poster.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export failed:", err);
    }
  }, [name]);

  const canExport = !!image && !!detection && !isProcessing;

  return (
    <div className="flex h-dvh flex-col-reverse overflow-hidden bg-[#0e0e0e] md:flex-row">
      {/* ── Controls — left on desktop, bottom on mobile ── */}
      <aside className="shrink-0 border-t border-[#222] md:w-[20%] md:min-w-[280px] md:border-t-0 md:border-r">
        <PosterControlsPanel
          template={template}
          onTemplateChange={handleTemplateChange}
          filter={filter}
          onFilterChange={setFilter}
          name={name}
          onNameChange={handleNameChange}
          role={role}
          onRoleChange={handleRoleChange}
          hasImage={!!image}
          onUploadClick={() => fileInputRef.current?.click()}
          isProcessing={isProcessing}
        />
      </aside>

      {/* ── Preview + Header — right on desktop, top on mobile ── */}
      <div className="flex flex-1 min-h-0 min-w-0 flex-col">
        {/* Header */}
        <header className="shrink-0 border-b border-[#222] px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 font-mono text-lg font-bold text-[#f0f0f0]">
                <span className="text-[#E49BC2]">SS</span>
                <span className="text-[#4ade80] text-sm">POSTER</span>
              </div>
              {modelStatus === "ready" && (
                <span className="text-[10px] font-mono text-[#4ade80] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                  Ready
                </span>
              )}
              {modelStatus === "loading" && (
                <span className="text-[10px] font-mono text-[#E49BC2] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E49BC2] animate-pulse" />
                  Loading...
                </span>
              )}
              {modelStatus === "error" && (
                <span className="text-[10px] font-mono text-[#ff6b6b] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]" />
                  No face detected
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExport}
                disabled={!canExport || isProcessing}
                className="flex items-center gap-2 rounded-lg border border-[#333] bg-[#1a1a1a] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#999] transition-all hover:border-[#555] hover:text-[#ccc] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/p/${poster.id}`)}
                disabled={!canExport}
                className="flex items-center gap-2 rounded-lg bg-[#E49BC2] px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#1a1a1a] transition-all hover:bg-[#d488b3] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <Share2 className="h-3.5 w-3.5" />
                Done — Share
              </button>
            </div>
          </div>
        </header>

        {/* Preview area */}
        <main className="flex flex-1 min-h-0 items-center justify-center p-6 md:p-10">
          <PosterPreview
            speaker={speaker}
            image={image}
            bgImage={bgImage}
            detection={detection}
            template={template}
            filter={filter}
            exportCanvasRef={exportCanvasRef}
          />
        </main>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Off-screen export canvas */}
      <canvas
        ref={exportCanvasRef}
        width={1080}
        height={1350}
        className="fixed -left-[9999px] top-0 pointer-events-none"
      />
    </div>
  );
}
