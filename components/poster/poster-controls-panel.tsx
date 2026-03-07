"use client";

import { useState } from "react";
import { Upload, Camera, ChevronDown, User, Sparkles } from "lucide-react";
import { PositionZoomControls } from "@/components/poster/poster-position-controls";
import type { TemplateType, FilterSettings } from "@/lib/poster/types";

type Tab = "info" | "style";

interface PosterControlsPanelProps {
  template: TemplateType;
  onTemplateChange: (t: TemplateType) => void;
  filter: FilterSettings;
  onFilterChange: (f: FilterSettings) => void;
  name: string;
  onNameChange: (name: string) => void;
  organization: string;
  onOrganizationChange: (organization: string) => void;
  hasImage: boolean;
  onUploadClick: () => void;
  isProcessing: boolean;
}

export function PosterControlsPanel({
  template,
  onTemplateChange,
  filter,
  onFilterChange,
  name,
  onNameChange,
  organization,
  onOrganizationChange,
  hasImage,
  onUploadClick,
  isProcessing,
}: PosterControlsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "info", label: "Info", icon: <User className="h-3.5 w-3.5" /> },
    { id: "style", label: "Style", icon: <Sparkles className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex flex-col bg-[#0e0e0e] md:h-full">
      {/* Tab bar */}
      <div className="flex shrink-0 border-b border-[#222] bg-[#111]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === tab.id
                ? "text-[#E49BC2] border-b-2 border-[#E49BC2] bg-[#E49BC2]/5"
                : "text-[#666] hover:text-[#999]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="overflow-y-auto p-4 h-[45dvh] md:h-0 md:flex-1">
        {activeTab === "info" && (
          <InfoTab
            hasImage={hasImage}
            onUploadClick={onUploadClick}
            isProcessing={isProcessing}
            name={name}
            onNameChange={onNameChange}
            organization={organization}
            onOrganizationChange={onOrganizationChange}
          />
        )}
        {activeTab === "style" && (
          <StyleTab
            template={template}
            onTemplateChange={onTemplateChange}
            filter={filter}
            onFilterChange={onFilterChange}
            advancedOpen={advancedOpen}
            setAdvancedOpen={setAdvancedOpen}
          />
        )}
      </div>
    </div>
  );
}

// ── Info Tab (Photo + Details) ──────────────────────────────────────
function InfoTab({
  hasImage,
  onUploadClick,
  isProcessing,
  name,
  onNameChange,
  organization,
  onOrganizationChange,
}: {
  hasImage: boolean;
  onUploadClick: () => void;
  isProcessing: boolean;
  name: string;
  onNameChange: (name: string) => void;
  organization: string;
  onOrganizationChange: (organization: string) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Photo upload */}
      <button
        type="button"
        onClick={onUploadClick}
        disabled={isProcessing}
        className="flex items-center gap-3 rounded-lg border-2 border-dashed border-[#333] bg-[#111] p-4 transition-colors hover:border-[#E49BC2]/50 hover:bg-[#E49BC2]/5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        {hasImage ? (
          <Camera className="h-6 w-6 text-[#666] shrink-0" />
        ) : (
          <Upload className="h-6 w-6 text-[#666] shrink-0" />
        )}
        <div className="text-left">
          <div className="text-[#999] font-mono text-sm">
            {hasImage ? "Change photo" : "Upload a photo"}
          </div>
          <div className="text-[#555] font-mono text-[10px] mt-0.5">
            {hasImage ? "Upload a different image" : "Select an image with a visible face"}
          </div>
        </div>
      </button>

      {/* Name */}
      <div>
        <label
          htmlFor="poster-name"
          className="text-[10px] font-mono uppercase tracking-widest text-[#666] mb-1.5 block"
        >
          Name
        </label>
        <input
          id="poster-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          maxLength={60}
          placeholder="Your name"
          className="w-full rounded-lg border border-[#2a2a2a] bg-[#141414] px-3 py-2.5 text-sm text-[#f0f0f0] font-mono placeholder:text-[#444] focus:border-[#E49BC2] focus:outline-none transition-colors"
        />
      </div>

      {/* Organization */}
      <div>
        <label
          htmlFor="poster-organization"
          className="text-[10px] font-mono uppercase tracking-widest text-[#666] mb-1.5 block"
        >
          Organization
        </label>
        <input
          id="poster-organization"
          type="text"
          value={organization}
          onChange={(e) => onOrganizationChange(e.target.value)}
          maxLength={100}
          placeholder="Your organization"
          className="w-full rounded-lg border border-[#2a2a2a] bg-[#141414] px-3 py-2.5 text-sm text-[#f0f0f0] font-mono placeholder:text-[#444] focus:border-[#E49BC2] focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
}

// ── Style Tab ───────────────────────────────────────────────────────
function StyleTab({
  template,
  onTemplateChange,
  filter,
  onFilterChange,
  advancedOpen,
  setAdvancedOpen,
}: {
  template: TemplateType;
  onTemplateChange: (t: TemplateType) => void;
  filter: FilterSettings;
  onFilterChange: (f: FilterSettings) => void;
  advancedOpen: boolean;
  setAdvancedOpen: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Crop Style */}
      <div>
        <h2 className="text-[10px] font-mono uppercase tracking-widest text-[#666] mb-2">
          Crop Style
        </h2>
        <div className="grid grid-cols-3 gap-1.5">
          {(["half-face", "eyes", "smile"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTemplateChange(t)}
              className={`rounded-md border px-2 py-2.5 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                template === t
                  ? "border-[#E49BC2] bg-[#E49BC2]/10 text-[#E49BC2]"
                  : "border-[#2a2a2a] bg-[#141414] text-[#777] hover:border-[#444] hover:text-[#aaa]"
              }`}
            >
              {t === "half-face" ? "Half Face" : t === "eyes" ? "Eyes" : "Smile"}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced (collapsible) */}
      <div className="rounded-lg border border-[#2a2a2a] bg-[#141414]">
        <button
          type="button"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex w-full items-center justify-between px-4 py-3 cursor-pointer"
        >
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#777]">
            Advanced
          </span>
          <ChevronDown
            className={`h-3.5 w-3.5 text-[#555] transition-transform ${
              advancedOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {advancedOpen && (
          <div className="px-4 pb-4">
            <PositionZoomControls
              filter={filter}
              onFilterChange={onFilterChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
