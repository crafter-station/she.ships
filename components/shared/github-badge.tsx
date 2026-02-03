"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const REPO = "crafter-station/she.ships";

export function GithubBadge() {
  const [githubStars, setGithubStars] = useState<number | null>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const starRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchGithubStars = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${REPO}`,
        );
        if (response.ok) {
          const data = await response.json();
          setGithubStars(data.stargazers_count);
          setTimeout(() => setShouldAnimate(true), 100);
        }
      } catch (error) {
        console.warn("Failed to fetch GitHub stars:", error);
      }
    };
    fetchGithubStars();
  }, []);

  return (
    <a
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-3 py-1.5 border border-white/10 text-warm-gray opacity-70 hover:opacity-100 transition-opacity duration-300"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>

      {githubStars !== null && shouldAnimate && (
        <motion.span
          className="text-white text-xs font-medium flex items-center gap-1"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "auto", opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 15,
            delay: 0.2,
          }}
        >
          <svg
            ref={starRef}
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            className="text-rose-coral"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="currentColor"
            />
          </svg>
          {githubStars}
        </motion.span>
      )}
    </a>
  );
}
