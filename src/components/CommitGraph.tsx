"use client"; // tell Next.js that this is a client component

import { useEffect, useState } from "react";

// define the shape of our commit data
interface commit {
  date: string; // format: YYYY-MM-DD
  count: number; // num of commits that day
}

// Define interfaces for the GitHub API response
interface GitHubCommit {
  sha: string;
  message: string;
}

interface GitHubEventPayload {
  commits: GitHubCommit[];
}

interface GitHubEvent {
  type: string;
  created_at: string;
  payload: GitHubEventPayload;
}

const CommitGraph = () => {
  const [commits, setCommits] = useState<commit[]>([]); // store commit data
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const username = "ernkerr";
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

        const response = await fetch(
          `https://api.github.com/users/${username}/events`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
          },
        );

        const data: GitHubEvent[] = await response.json();

        // transform the raw github data into a list of commits
        //0: count: 1, date: "2025-01-20"
        const commitData = data
          // filter to only include PushEvents (when commits are pushed)
          .filter((event: GitHubEvent) => event.type === "PushEvent")
          // map to get the date and num of commits for each day
          .map((event: GitHubEvent) => ({
            date: event.created_at.split("T")[0], // get just the date part
            count: event.payload.commits.length, // num of commits
          }));

        console.log("commitData", commitData);

        setCommits(commitData);
        setError(null);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
        setError("Failed to fetch GitHub data. Please try again later.");
      }
    };

    fetchGithubData();
  }, []); // empty array means this only runs once when mounted

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return (
    <div className="m-1 h-full w-full p-1 sm:p-2">
      <div className="flex h-full flex-col">
        {/* <h3 className="mb-2 text-sm font-medium">GitHub Activity</h3> */}
        <div className="rows-4 grid flex-1 auto-rows-fr grid-cols-7 gap-1">
          {commits.map((day, index) => (
            <div
              key={index}
              // use a nested ternary operator (? :) to determine which CSS class to apply based on the num commits
              className={`rounded-sm transition-colors duration-500 sm:rounded-md md:rounded-sm ${
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
      </div>
    </div>
  );
};

export default CommitGraph;
