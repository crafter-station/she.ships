"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Nav } from "@/components/sections/nav";
import { Footer } from "@/components/sections/footer";
import { SectionWrapper } from "@/components/decorative/section-wrapper";
import { Button } from "@/components/ui/button";
import { MoralejaDesignLogo } from "@/components/logos/moraleja-design";
import { useTranslation } from "@/lib/i18n/context";

const WALLPAPERS = [
  { src: "/wallpapers/SS-Wallpaper-01.jpg", filename: "SS-Wallpaper-01.jpg" },
  { src: "/wallpapers/SS-Wallpaper-02.jpg", filename: "SS-Wallpaper-02.jpg" },
  { src: "/wallpapers/SS-Wallpaper-03.png", filename: "SS-Wallpaper-03.png" },
  { src: "/wallpapers/SS-Wallpaper-04.png", filename: "SS-Wallpaper-04.png" },
] as const;

export default function WallpapersPage() {
  const { t } = useTranslation();
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch("/api/wallpapers")
      .then((res) => res.json())
      .then((data) => setCounts(data))
      .catch(() => {});
  }, []);

  const handleDownload = useCallback(
    (filename: string, src: string) => {
      // Optimistically increment count
      setCounts((prev) => ({
        ...prev,
        [filename]: (prev[filename] ?? 0) + 1,
      }));

      // Persist to Redis
      fetch("/api/wallpapers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename }),
      }).catch(() => {});

      // Trigger download
      const a = document.createElement("a");
      a.href = src;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    [],
  );

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <SectionWrapper
          variant="dark"
          className="min-h-[50vh] flex items-center"
        >
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-[family-name:var(--font-title)] text-6xl font-black tracking-tight text-white md:text-7xl lg:text-8xl uppercase mb-6">
              {t.wallpapers.headline}{" "}
              <span className="text-primary-pink">
                {t.wallpapers.headlineAccent}
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
              {t.wallpapers.subtitle}
            </p>
            <p className="text-sm uppercase tracking-wide text-white/50 flex items-center justify-center gap-2">
              {t.wallpapers.credit}
              <a
                href="https://moraleja.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary-pink hover:text-primary-green transition-colors"
              >
                <MoralejaDesignLogo className="size-4" />
                {t.wallpapers.creditStudio}
              </a>
            </p>
          </div>
        </SectionWrapper>

        {/* Gallery */}
        <SectionWrapper variant="cream" bordered>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {WALLPAPERS.map((wp) => (
              <div
                key={wp.filename}
                className="brutalist-card bg-white p-3 md:p-4 flex flex-col gap-3"
              >
                <div className="relative aspect-[9/16] w-full overflow-hidden border-3 border-primary-black">
                  <Image
                    src={wp.src}
                    alt="She Ships Wallpaper"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 22vw"
                  />
                </div>

                <span className="data-label text-center">
                  {counts[wp.filename] ?? 0} {t.wallpapers.downloads}
                </span>

                <Button
                  type="button"
                  variant="pink"
                  size="sm"
                  className="w-full"
                  onClick={() => handleDownload(wp.filename, wp.src)}
                >
                  <Download className="size-4" />
                  {t.wallpapers.download}
                </Button>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </>
  );
}
