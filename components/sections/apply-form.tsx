"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/context";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";

type FormState = "idle" | "submitting" | "success" | "error";

export function ApplyForm() {
  const { t } = useTranslation();
  const [projectName, setProjectName] = useState("");
  const [category, setCategory] = useState<"instagram" | "linkedin" | "">("");
  const [postUrl, setPostUrl] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = projectName.trim() && category && postUrl.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    setFormState("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectName: projectName.trim(), category, postUrl: postUrl.trim() }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setFormState("success");
    } catch {
      setFormState("error");
      setErrorMessage(t.apply.errorGeneric);
    }
  };

  if (formState === "success") {
    return (
      <SectionWrapper variant="cream" bordered className="min-h-[60vh] flex items-center">
        <div className="max-w-2xl mx-auto text-center">
          <div className="brutalist-card bg-white p-12">
            <h2 className="font-[family-name:var(--font-title)] text-4xl font-black uppercase mb-4 text-primary-black">
              {t.apply.successTitle}
            </h2>
            <p className="text-lg text-neutral-gray">
              {t.apply.successDescription}
            </p>
          </div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper variant="cream" bordered className="min-h-[60vh] flex items-center" id="register">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-10">
          <span className="data-label text-primary-pink mb-4 block">
            {t.apply.label}
          </span>
          <h2 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase text-primary-black">
            {t.apply.headline}{" "}
            <span className="text-primary-pink">{t.apply.headlineAccent}</span>
          </h2>
          <p className="text-lg text-neutral-gray mt-4 max-w-lg mx-auto">
            {t.apply.description}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Project Name */}
          <div className="brutalist-card bg-white p-6 md:p-8">
            <label className="block mb-2">
              <span className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-primary-black">
                {t.apply.projectNameLabel}
                <span className="text-primary-pink">*</span>
              </span>
              <span className="block text-sm text-neutral-gray mt-1">
                {t.apply.projectNameHint}
              </span>
            </label>
            <input
              type="text"
              required
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={t.apply.projectNamePlaceholder}
              className="w-full h-12 px-4 bg-neutral-light border-3 border-primary-black text-primary-black placeholder:text-neutral-gray/50 focus:outline-none focus:ring-2 focus:ring-primary-pink font-medium"
            />
          </div>

          {/* 2. Category */}
          <div className="brutalist-card bg-white p-6 md:p-8">
            <fieldset>
              <legend className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-primary-black mb-1">
                {t.apply.categoryLabel}
                <span className="text-primary-pink">*</span>
              </legend>
              <span className="block text-sm text-neutral-gray mb-4">
                {t.apply.categoryHint}
              </span>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setCategory("instagram")}
                  className={`flex-1 h-14 px-6 border-3 border-primary-black font-bold uppercase tracking-wide transition-all ${
                    category === "instagram"
                      ? "bg-primary-pink text-primary-black brutalist-shadow-sm"
                      : "bg-white text-primary-black hover:bg-neutral-light"
                  }`}
                >
                  Instagram
                </button>
                <button
                  type="button"
                  onClick={() => setCategory("linkedin")}
                  className={`flex-1 h-14 px-6 border-3 border-primary-black font-bold uppercase tracking-wide transition-all ${
                    category === "linkedin"
                      ? "bg-primary-pink text-primary-black brutalist-shadow-sm"
                      : "bg-white text-primary-black hover:bg-neutral-light"
                  }`}
                >
                  LinkedIn
                </button>
              </div>
            </fieldset>
          </div>

          {/* 3. Post URL */}
          <div className="brutalist-card bg-white p-6 md:p-8">
            <label className="block mb-2">
              <span className="font-[family-name:var(--font-title)] text-xl font-black uppercase text-primary-black">
                {t.apply.postUrlLabel}
                <span className="text-primary-pink">*</span>
              </span>
              <span className="block text-sm text-neutral-gray mt-1">
                {t.apply.postUrlHint}
              </span>
            </label>
            <input
              type="url"
              required
              value={postUrl}
              onChange={(e) => setPostUrl(e.target.value)}
              placeholder="https://"
              className="w-full h-12 px-4 bg-neutral-light border-3 border-primary-black text-primary-black placeholder:text-neutral-gray/50 focus:outline-none focus:ring-2 focus:ring-primary-pink font-medium"
            />
          </div>

          {/* T&C checkbox */}
          <div className="flex items-start gap-3 px-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-5 w-5 shrink-0 appearance-none border-3 border-primary-black bg-white checked:bg-primary-pink cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-neutral-gray cursor-pointer select-none">
              {t.apply.termsLabel}
            </label>
          </div>

          {/* Error */}
          {formState === "error" && errorMessage && (
            <p className="text-center text-primary-pink font-bold">{errorMessage}</p>
          )}

          {/* Submit */}
          <div className="text-center">
            <Button
              type="submit"
              variant="pink"
              size="lg"
              disabled={!isValid || formState === "submitting"}
              className="min-w-[200px]"
            >
              {formState === "submitting" ? t.apply.submitting : t.apply.submitButton}
            </Button>
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
}
