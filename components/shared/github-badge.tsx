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
      className="group flex items-center gap-2 px-3 py-2 border-2 border-primary-black bg-white text-primary-black shrink-0 min-w-0 transition-all duration-200 ease-out hover:bg-primary-pink hover:text-white hover:shadow-[4px_4px_0_0_#1A1A1A] hover:scale-105 active:scale-[0.98] active:shadow-[2px_2px_0_0_#1A1A1A]"
      aria-label={`GitHub repository: ${githubStars !== null ? `${githubStars} stars` : "View on GitHub"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
        aria-hidden
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>

      {githubStars !== null && shouldAnimate && (
        <motion.span
          className="hidden sm:flex items-center gap-1.5 text-sm font-bold tabular-nums transition-colors duration-200 group-hover:text-white"
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
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="shrink-0 text-primary-pink transition-colors duration-200 group-hover:text-white"
            aria-hidden
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="currentColor"
            />
          </svg>
          <span>{githubStars}</span>
        </motion.span>
      )}
    </a>
  );
}
