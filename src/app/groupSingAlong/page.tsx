"use client";

import ProjectTemplate from "@/components/ProjectTemplate";

export default function GroupSingAlong() {
  return (
    <>
      <ProjectTemplate
        title="Group Sing Along"
        description="Description"
        type="Personal Project"
        stack={["React", "Next.js", "Tailwind", "Vercel Postgres"]}
        link="https://groupsingalong.com"
        img="/carpoolio1.png"
        purpose="Purpose"
        stackexp="Tech Stack"
        stackimg="/react.png"
        stackimg2="/node.png"
        stackimg3="/vercel.png"
        img2="/carpoolio1.png"
        img3="/carpoolio3.png"
        problems="Problems"
        lessons="Lessons Learned"
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
