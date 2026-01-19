"use client";

import ProjectTemplate from "@/components/ProjectTemplate";
export default function GinScoreTracker() {
  return (
    <>
      <ProjectTemplate
        title="Gin Score Tracker"
        description={
          <>
            Gin Score Tracker, was and is, my first mobile app.
            <br />
            <br />
            It was designed to enhance the experience of playing Gin by allowing
            <br />
            users to track scores, manage multiple games, and review past games{" "}
            <br />— all within a clean, intuitive interface.
          </>
        }
        type="Mobile App"
        stack={["React Native", "Expo Go", "Nativewind"]}
        link="https://apps.apple.com/us/app/gin-score-tracker/id6746460027"
        img="/images/ginScoreTracker/GinLandscape.png"
        purpose={
          <>
            <strong>Gin Score Tracker</strong> is a personal project born out of
            my love for playing Gin with family
            <br />
            and the need for a better way to keep track of our scoring. I wanted
            to create a tool
            <br />
            that would make it easy to log scores, manage ongoing games, and
            look back <br />
            at past sessions without the discontinuity of paper and pen.
          </>
        }
        stackexp={
          <>
            For Gin Score Tracker, I chose a tech stack that balanced simplicity
            and functionality.
            <br />
            <br />
            It is built with
            <strong> React Native</strong> allowing me to build <br />a
            cross-platform app from a single codebase,
            <br />
            ensuring smooth performance on both iOS and
            <a href="https://www.reddit.com/r/AndroidClosedTesting/comments/1kwv0an/building_my_first_android_app_gin_score_tracker/">
              {" "}
              Android
            </a>
            .
            <br />
            <br />
            <strong> Expo Go</strong> simplified the building process by
            managing
            <br />
            the underlying environment and native aspects, <br />
            letting me focus on functionality.
            <br />
            <br />
            For styling, I used <strong>NativeWind</strong>, which brings the{" "}
            <br />
            utility-first approach of Tailwind CSS to React Native.
            <br />
            This helped keep the UI consistent, responsive, and quick to
            iterate.
            <br />
            <br />
            Visually, I leaned into a{" "}
            <strong>
              <a href="https://dribbble.com/shots/26273903-Gin-Score-Tracker">
                Neo Brutalism UI
              </a>
            </strong>{" "}
            — embracing bold colors, thick borders,
            <br />
            raw geometry, and a deliberately &apos;unpolished&apos; aesthetic{" "}
            <br />
            that feels both nostalgic and modern <br />
          </>
        }
        stackimg="/reactnative.png"
        stackimg2="/expo.png"
        stackimg3="/nativewind.png"
        img2="/images/ginScoreTracker/GinLogo.png"
        img3="/images/ginScoreTracker/GinLogo.png"
        problems={
          <>
            One of the main challenges I faced was ensuring <br />
            that the score tracking was accurate and user-friendly.
            <br />
            <br />I had to implement a system that could handle
            <br />
            multiple variants of the game while remaining easy to understand.
            <br />
            <br />
            Another challenge was designing an interface that worked well <br />
            for non-technical users - including older family members and friends
            who play Gin.
          </>
        }
        img4="/images/ginScoreTracker/ginScreenshots.png"
        lessons={
          <>
            This was my first fully shipped mobile app — and what made me my
            first internet dollar.
            <br />
            <br />I learned how to scope a project tightly, prioritize user
            experience, and ship before it&apos;s “perfect.” <br />
            It also taught me the process of submitting an app to the App Store,{" "}
            <br />
            using local storage for persistent data, and gathering feedback from
            real users. <br />
            <br />
            Choosing a small but meaningful idea that solved a real need —{" "}
            <br />
            in this case, for friends and family — made development faster and
            more focused.
            <br />
            <br />
            However probably the most important thing I&apos;ve learned from
            launching this app is that I am an app developer. <br /> I am not
            only capable but I&apos;m becoming more confident in my ability to
            create the products I want to see in the world.
            <br />
          </>
        }
      />
      {/* add metrics? */}
    </>
  );
}
