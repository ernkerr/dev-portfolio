"use client";

import ProjectTemplate from "@/components/ProjectTemplate";
export default function ginScoreTracker() {
  return (
    <ProjectTemplate
      title="Gin Score Tracker"
      description={
        <>
          Gin Score Tracker is a mobile application designed to enhance the
          experience of playing the card game Gin Rummy. It allows players to
          easily track their scores, manage their games, and enjoy a more
          streamlined gaming experience.
        </>
      }
      type="Personal Project"
      stack={["React", "Next.js", "Tailwind", "Vercel"]}
      link="https://apps.apple.com/us/app/gin-score-tracker/id6746460027"
      img="/ginScoreTracker.jpg"
      purpose={
        <>
          The goal of Gin Score Tracker is to simplify the process of keeping
          score in Gin Rummy, making it easier for players to focus on the game
          itself rather than manual calculations. It provides a user-friendly
          interface for tracking scores, managing multiple games, and reviewing
          past games.
        </>
      }
      stackexp={
        <>
          For Gin Score Tracker, I chose a tech stack that balances simplicity
          and functionality. The application is built with{" "}
          <strong>React Native</strong>
        </>
      }
      stackimg="/react.png"
      stackimg2="/next.png"
      stackimg3="/vercel.png"
      img2="/ginScoreTracker2.png"
      img3="/ginScoreTracker3.png"
      problems={
        <>
          One of the main challenges was ensuring that the score tracking was
          accurate and user-friendly. I had to implement a system that could
          handle multiple variations of the game simultaneously while keeping
          the interface intuitive for users.
        </>
      }
      img4="/ginScoreTracker4.png"
      lessons={
        <>
          This project taught me a lot about mobile app development,
          particularly in terms of user experience design and performance
          optimization. It also reinforced the importance of testing and
          iteration in creating a successful application.
        </>
      }
    />
  );
}
