"use client";

import ProjectTemplate from "@/components/ProjectTemplate";

export default function GroupSingAlong() {
  return (
    <>
      <ProjectTemplate
        title="Group Sing Along"
        description={
          <>
            Group Sing Along is a full-stack web application designed to
            facilitate group singing sessions. Whether at family gatherings,
            parties, or community events, this app ensures that everyone can
            follow along with the lyrics in real time. Instead of relying on
            outdated or insufficient physical songbooks, Group Sing Along
            provides a modern, centralized solution for shared singing.
          </>
        }
        type="Personal Project"
        stack={["React", "Next.js", "Tailwind", "Vercel"]}
        link="https://groupsingalong.com"
        img="/singalong.jpg"
        purpose={
          <>
            Singing together is a deeply human social activity that fosters
            connection and joy. However, in large gatherings, not everyone knows
            the lyrics, and printed songbooks are often outdated or unavailable.
            Group Sing Along solves this by offering a digital, real-time lyric
            display, controlled by a designated conductor who selects songs for
            the group. The goal is to create a seamless, inclusive experience
            that makes singing together more accessible and enjoyable for all
            ages.
          </>
        }
        stackexp={
          <>
            For Group Sing Along, I chose a straightforward tech stack that was
            easy to set up and fit my beginner-level skills while still allowing
            me to learn and experiment with more advanced tools.
            <br />
            <br />
            Group Sing Along is built with <strong>Next.js (React)</strong> for
            its flexibility, component-based architecture, and ability to handle
            real-time updates efficiently. Styling is done with{" "}
            <strong>Tailwind CSS</strong>, allowing for full customization.
            <strong>Vercel Postgres (via Prisma) </strong>handles database
            operations, storing song lyrics and user session data securely. The
            app is hosted on
            <strong>Vercel</strong>, which offers fast, serverless deployment,
            ensuring accessibility with minimal setup. This stack was chosen to
            keep the project lightweight, scalable, and easy to maintain,
            allowing for smooth real-time interactions between users.
          </>
        }
        stackimg="/react.png"
        stackimg2="/next.png"
        stackimg3="/vercel.png"
        img2="/groupsing2.png"
        img3="/groupsing3.png"
        problems={
          <>
            One of the biggest challenges I faced was ensuring that the first
            user to join became the conductor, controlling the song selection
            for the group. I had to implement logic to assign this role
            automatically and handle edge cases where the conductor left or
            disconnected. Another issue was making sure that late joiners still
            received the current lyrics before the next real-time update. Since
            Pusher broadcasts only new events, users who joined mid-song
            wouldn&apos;t see any lyrics until the next update. To fix this, I
            had to fetch and display the latest lyrics from the database upon
            joining, ensuring that everyone stayed in sync regardless of when
            they entered the session.
          </>
        }
        img4="/group.jpg"
        lessons={
          <>
            One of the biggest technical takeaways from this project was
            learning how to implement real-time updates using Pusher.
            Understanding how to subscribe to channels and broadcast events was
            essential, but as a first-time user, I ran into issues with properly
            handling subscriptions and ensuring events were correctly received
            across clients. Debugging real-time interactions was challenging,
            but once I got it working, it significantly improved the app&apos;s
            responsiveness.
            <br />
            <br />
            Additionally, Next.js had a bit of a learning curve, but once I got
            the hang of it, it dramatically sped up my build time compared to
            previous projects. In fact, I was able to build this entire app in
            just two weeks, which wouldn&apos;t have been possible with a less
            efficient framework. These lessons reinforced the importance of
            choosing the right tools for the job and how real-time data handling
            can greatly enhance user experience.
          </>
        }
      />
    </>
    // <div className="min-h-screen bg-slate-100 text-white dark:bg-slate-900">
    //   <h1
    //     className={`${poiretOne.className} text-md flex items-center justify-center p-2 font-medium sm:p-3 md:p-6 md:text-lg lg:p-8 lg:text-4xl`}
    //   >
    //     Group Sing Along
    //   </h1>
    //   <h2>Subtitle </h2>
    //   {/* <p>I created this app for my stepdad </p> */}

    //   <DarkModeToggle />
    // </div>
  );
}
