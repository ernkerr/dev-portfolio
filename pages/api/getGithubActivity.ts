// // server side BUT serverless function
// export default async function handler(req, res) {
//   try {
//     const username = "ernkerr";
//     const token = process.env.GITHUB_TOKEN;

//     const response = await fetch(
//       `https://api.github.com/users/${username}/events`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/vnd.github.v3+json",
//         },
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`GitHub API responded with status ${response.status}`);
//     }

//     const data = await response.json();

//     const commitData = data
//       .filter((event) => event.type === "PushEvent")
//       .map((event) => ({
//         date: event.created_at.split("T")[0],
//         count: event.payload.commits.length,
//       }));

//     res.status(200).json({ commits: commitData });
//   } catch (error) {
//     console.error("Error fetching GitHub data:", error);
//     res.status(500).json({ error: "Failed to fetch GitHub data" });
//   }
// }
