export interface Repo {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  stars: number;
  pushedAt: string;
}

interface ApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

/** Keep public, non-fork, non-archived repos, most recently pushed first. */
export function pickRecentRepos(repos: ApiRepo[], { exclude = [] as string[], limit = 6 } = {}): Repo[] {
  const skip = new Set(exclude.map((name) => name.toLowerCase()));
  return repos
    .filter((r) => !r.fork && !r.archived && !r.private && !skip.has(r.name.toLowerCase()))
    .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
    .slice(0, limit)
    .map((r) => ({
      name: r.name,
      description: r.description,
      url: r.html_url,
      homepage: r.homepage || null,
      language: r.language,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));
}

/**
 * The user's most recently pushed public repositories. Cached for a day by
 * Next.js. Returns [] if GitHub is unreachable or rate-limited, so the page
 * still renders (the section just hides).
 *
 * Set GITHUB_TOKEN to raise the API rate limit. GITHUB_API_URL overrides the
 * API base (useful for tests or GitHub Enterprise).
 */
export async function getRecentRepos(user: string, options?: { exclude?: string[]; limit?: number }): Promise<Repo[]> {
  const base = process.env.GITHUB_API_URL ?? "https://api.github.com";
  try {
    const res = await fetch(`${base}/users/${user}/repos?per_page=100&sort=pushed`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`GitHub API responded ${res.status}; hiding the recent repositories section.`);
      return [];
    }
    return pickRecentRepos((await res.json()) as ApiRepo[], options);
  } catch (error) {
    console.warn("Could not reach the GitHub API; hiding the recent repositories section.", error);
    return [];
  }
}
