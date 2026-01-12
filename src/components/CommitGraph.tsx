"use client";

import { useEffect, useState } from "react";

// define the shape of our commit data
interface commit {
  date: string; // format: YYYY-MM-DD
  count: number; // num of commits that day
}

const CommitGraph = () => {
  const [commits, setCommits] = useState<commit[]>([]); // store commit data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Add caching logic
    const cachedData = sessionStorage.getItem("githubCommits");
    const cachedTimestamp = sessionStorage.getItem("githubCommitsTimestamp");
    const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds

    const fetchGithubData = async () => {
      try {
        // Check if we have cached data less than 1 hour old
        if (
          cachedData &&
          cachedTimestamp &&
          Date.now() - Number(cachedTimestamp) < ONE_HOUR
        ) {
          setCommits(JSON.parse(cachedData));
          return;
        }

        const response = await fetch("/api/getGithubActivity");

        if (!response.ok) {
          throw new Error(
            `GitHub API responded with status ${response.status}`,
          );
        }

        const data = await response.json();
        const commitData = data.commits;

        // cache the data so we don't go over the 60 API calls per hour limit
        sessionStorage.setItem("githubCommits", JSON.stringify(commitData));
        sessionStorage.setItem("githubCommitsTimestamp", Date.now().toString());

        setCommits(commitData);
        setError(null);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        // setError("Failed to fetch GitHub data");
      }
    };

    fetchGithubData();
  }, []); // empty array means this only runs once when mounted

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return (
    <a
      href="https://github.com/ernkerr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full w-full items-center justify-center p-2"
    >
      <div className="grid grid-cols-7 gap-[3px]">
        {commits.slice(0, 28).map((day, index) => (
          <div
            key={index}
            className={`h-3 w-3 rounded-sm transition-colors duration-500 sm:h-4 sm:w-4 ${
              !day ||
              day.count === undefined ||
              day.count === null ||
              day.count === 0
                ? "bg-blue-600 dark:bg-blue-600" // No commits or undefined/null
                : day.count < 2
                  ? "bg-blue-400 dark:bg-blue-500" // 1 commit
                  : day.count < 3
                    ? "bg-blue-300 dark:bg-blue-400" // 2 commits
                    : day.count < 5
                      ? "bg-blue-200 dark:bg-blue-300" // 3-4 commits
                      : "bg-blue-100 dark:bg-blue-200" // 5+ commits
            }`}
            title={`${day.count} commits on ${day.date}`}
          />
        ))}
      </div>
    </a>
  );
};

export default CommitGraph;
