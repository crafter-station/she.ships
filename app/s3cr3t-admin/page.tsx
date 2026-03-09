import { db } from "@/lib/db";
import { socialSubmissions } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const submissions = await db
    .select()
    .from(socialSubmissions)
    .orderBy(desc(socialSubmissions.createdAt));

  return (
    <main className="min-h-screen bg-primary-black text-primary-cream p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="font-[family-name:var(--font-title)] text-4xl md:text-5xl font-black uppercase tracking-tight">
            Social Contest{" "}
            <span className="text-primary-pink">Submissions</span>
          </h1>
          <p className="text-primary-cream/60 mt-2 text-sm font-mono">
            {submissions.length} submission{submissions.length !== 1 && "s"} total
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="brutalist-card bg-primary-cream text-primary-black p-12 text-center">
            <p className="text-xl font-bold uppercase">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((s, i) => (
              <div
                key={s.id}
                className="brutalist-card bg-primary-cream text-primary-black p-6 flex flex-col md:flex-row md:items-center gap-4"
              >
                <span className="data-label text-primary-pink shrink-0 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-[family-name:var(--font-title)] text-lg font-black uppercase truncate">
                    {s.projectName}
                  </p>
                  <p className="text-sm text-neutral-gray font-mono">
                    {new Date(s.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <span
                  className={`inline-block px-3 py-1 border-3 border-primary-black text-xs font-bold uppercase tracking-wide shrink-0 ${
                    s.category === "instagram"
                      ? "bg-primary-pink"
                      : "bg-primary-green"
                  }`}
                >
                  {s.category}
                </span>

                <a
                  href={s.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-primary-black text-primary-cream text-xs font-bold uppercase tracking-wide hover:opacity-80 transition-opacity shrink-0"
                >
                  View Post &rarr;
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
