"use client";

import ProjectTemplate from "@/components/ProjectTemplate";

export default function HeartsScoreTracker() {
  return (
    <>
      <ProjectTemplate
        title="Hearts Score Tracker"
        description={
          <>
            Hearts Score Tracker is my third shipped mobile app,
            <br />
            built specifically for the card game Hearts.
            <br />
            <br />
            While the app serves a different game, it was intentionally designed
            <br />
            using the same underlying architecture as Gin Score Tracker —
            allowing
            <br />
            me to move faster, stay consistent, and iterate with confidence.
          </>
        }
        type="Indie App"
        stack={["React Native", "Expo Go", "NativeWind"]}
        link="https://apps.apple.com/us/app/hearts-score-tracker/id6755978632" // replace with real link
        img="/images/heartsScoreTracker/icon.png"
        purpose={
          <>
            <strong>Hearts Score Tracker</strong> was built to solve the same
            core problem as Gin Score Tracker,
            <br />
            replacing pen-and-paper scoring, but for a game with very different
            rules and dynamics.
            <br />
            <br />
            My goal was to create a focused, lightweight experience for tracking
            <br />
            scores across multiple players while keeping setup fast and the UI
            <br />
            frictionless during gameplay.
          </>
        }
        stackexp={
          <>
            The Hearts app shares a large portion of its foundation with Gin
            Score Tracker.
            <br />
            <br />I intentionally designed both apps around a{" "}
            <strong>shared component architecture</strong>, reusing core UI
            components such as score inputs, game summaries, layouts, and
            navigation patterns.
            <br />
            <br />
            This approach significantly{" "}
            <strong>reduced development time</strong> and improved
            <strong> maintainability</strong>, allowing changes and improvements
            <br />
            to be made consistently across projects.
            <br />
            <br />
            Like Gin, the app is built with <strong>React Native</strong> and
            <strong> Expo</strong> for a single cross-platform codebase, and
            styled with <strong>NativeWind</strong> to keep UI iteration fast
            and consistent.
          </>
        }
        stackimg="/reactnative.png"
        stackimg2="/expo.png"
        stackimg3="/nativewind.png"
        img2="/images/heartsScoreTracker/newGame.png"
        img3="/images/heartsScoreTracker/roundScores.png"
        problems={
          <>
            The main challenge with Hearts Score Tracker wasn’t building from
            scratch — it was adapting an existing structure to fit a
            fundamentally different game.
            <br />
            <br />
            Hearts introduces variable player counts, different scoring rules,
            and game-ending conditions that required rethinking the underlying
            logic while keeping the UI familiar.
            <br />
            <br />
            Balancing code reuse with flexibility meant carefully separating
            shared components from game-specific logic, ensuring the app felt
            purpose-built rather than reused.
          </>
        }
        img4="/images/heartsScoreTracker/icon2.png"
        lessons={
          <>
            Building Hearts Score Tracker reinforced the value of{" "}
            <strong>reusable architecture</strong> and thoughtful abstraction.
            <br />
            <br />
            Instead of copying and modifying code, I learned to design
            components and state logic that could adapt to different games with
            minimal friction.
            <br />
            <br />
            This project helped solidify my confidence in scaling ideas beyond a
            single app — turning one successful project into a foundation for
            many.
            <br />
            <br />
            It also showed me how small, focused products can compound over time
            when built with maintainability and iteration in mind.
          </>
        }
      />
    </>
  );
}
