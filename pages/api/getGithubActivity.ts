import type { NextApiRequest, NextApiResponse } from "next";

interface GitHubRepo {
  full_name: string;
}

interface GitHubCommitResponse {
  commit: {
    author: {
      date: string;
    };
  };
}

interface CommitData {
  date: string;
  count: number;
}

// Module-level cache (persists across requests until server restart)
let cachedCommits: CommitData[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// server side BUT serverless function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ commits: CommitData[] } | { error: string }>,
) {
  try {
    // Return cached data if valid
    if (cachedCommits && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_TTL) {
      return res.status(200).json({ commits: cachedCommits });
    }

    const username = "ernkerr";
    const token = process.env.GITHUB_TOKEN;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Get ALL user repos (paginate to get all)
    let allRepos: GitHubRepo[] = [];
    let page = 1;
    while (true) {
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
        { headers },
      );

      if (!reposResponse.ok) {
        throw new Error(`GitHub API responded with status ${reposResponse.status}`);
      }

      const repos: GitHubRepo[] = await reposResponse.json();
      if (repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      page++;
    }

    // 2. Fetch commits from each repo in parallel
    const commitPromises = allRepos.map((repo) =>
      fetch(
        `https://api.github.com/repos/${repo.full_name}/commits?author=${username}&per_page=100`,
        { headers },
      ).then((res) => (res.ok ? res.json() : [])),
    );

    const allCommitsArrays: GitHubCommitResponse[][] = await Promise.all(commitPromises);

    // 3. Aggregate commits by date
    const commitsByDate: Record<string, number> = {};

    for (const commits of allCommitsArrays) {
      for (const commit of commits) {
        const date = commit.commit.author.date.split("T")[0];
        commitsByDate[date] = (commitsByDate[date] || 0) + 1;
      }
    }

    // 4. Convert to array format sorted by date (most recent first)
    const commitData: CommitData[] = Object.entries(commitsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.date.localeCompare(a.date));

    // Store in cache
    cachedCommits = commitData;
    cacheTimestamp = Date.now();

    res.status(200).json({ commits: commitData });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
}
