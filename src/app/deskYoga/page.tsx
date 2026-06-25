"use client";

import { pressStart } from "../../../public/fonts/fonts";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";

export default function DeskYoga() {
  return (
    <div className="bg-slate-900 text-white">
      <NavBar />

      <div className="flex flex-col p-8 md:p-12 lg:px-48">
        <h1
          className={`${pressStart.className} pb-8 text-2xl sm:text-4xl md:text-5xl`}
        >
          Desk Yoga
        </h1>
        <h3 className="py-8 text-sm md:max-w-[70%] lg:max-w-[80%] lg:py-16 lg:text-[16px]">
          Feel better while you work, not before or after it.
          <br />
          <br />
          Desk Yoga is a cross-platform mobile app that guides you through
          short, desk-friendly yoga sessions. Unlike traditional yoga apps, it
          is designed to be done while working: between meetings, during calls,
          or whenever your body needs a reset.
          <br />
          <br />
          Choose from 9 problem-driven presets like Posture Corrector, Tech Neck
          Reset, and Mouse Hand Relief, or let the smart session engine build a
          flow based on your constraints: sitting vs standing, camera on or off,
          and whether you need your hands free for typing.
        </h3>

        <div className="flex flex-row gap-4 py-8 md:gap-32">
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Type</h3>
            <p>Mobile App</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Tech Stack</h3>
            <p>React Native</p>
            <p>Expo</p>
            <p>TypeScript</p>
            <p>NativeWind</p>
            <p>MMKV</p>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <h3 className="font-bold md:text-lg">Live</h3>
            <Link
              href="https://ernkerr.github.io/demos/desk-yoga/"
              className="cursor-pointer text-blue-500"
            >
              View Site
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-start lg:py-8">
          <Image
            src="/images/deskYoga/icon.png"
            alt="Desk Yoga"
            width={700}
            height={500}
            className="md:w-2/3 lg:w-4/5"
          />
        </div>

        {/* Purpose */}
        <div className="flex flex-col items-start">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Project Purpose & Goal
          </h2>
          <p className="md:text-md text-xs sm:text-sm md:max-w-[80%] lg:text-[16px]">
            Most wellness apps ask you to stop what you&apos;re doing. Desk Yoga
            works around your schedule instead. The goal was to build something
            that fits into a workday without requiring a mat, a change of
            clothes, or a break longer than a few minutes.
            <br />
            <br />
            The app includes a freemium model with in-app purchases (weekly,
            monthly, yearly subscriptions and a lifetime option) so free users
            get a curated set of poses while paid users unlock the full catalog
            of 80+ poses and all presets.
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-col items-start">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Stack & Explanation
          </h2>
          <p className="md:text-md text-xs sm:text-sm lg:text-[16px] md:max-w-[80%]">
            Built with <strong>Expo SDK 54</strong> and{" "}
            <strong>React Native 0.81</strong> for iOS, Android, and web from a
            single codebase. <strong>Expo Router</strong> handles file-based
            navigation. Styling uses <strong>NativeWind v4</strong> (Tailwind
            for React Native) with <strong>Gluestack UI</strong> components.
            <br />
            <br />
            Local-first storage via <strong>MMKV</strong> for instant,
            encrypted persistence. Monetization through{" "}
            <strong>react-native-iap</strong> with StoreKit 2 on iOS and Play
            Billing on Android. Animations use{" "}
            <strong>react-native-reanimated</strong> for polished pose
            transitions with multi-pulse edge glow effects.
          </p>
          <div className="mt-6 flex flex-row items-center gap-6">
            <Image
              src="/stackLogos/reactnative.png"
              alt="React Native"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <Image
              src="/stackLogos/expo.png"
              alt="Expo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <Image
              src="/stackLogos/typescript.png"
              alt="TypeScript"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </div>
        </div>

        {/* Problems */}
        <div className="flex flex-col items-center">
          <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            Problems & Thought Process
          </h2>
          <p className="text-xs sm:px-8 sm:text-sm lg:max-w-[80%] lg:text-[16px]">
            <strong>Pose selection under constraints.</strong> The session
            engine has to pick poses that match your posture (sitting or
            standing), whether your camera is on, whether you need your hands
            free, and your target focus area. It also tracks history to avoid
            repeats and pairs left/right variants in sequence.
            <br />
            <br />
            <strong>Animation choreography.</strong> Pose transitions use
            react-native-reanimated to coordinate multi-pulse edge glows,
            full-screen overlay fades, and pose card opacity changes with
            precise timing. Pausing mid-transition required cancellation logic
            to prevent stuck states.
            <br />
            <br />
            <strong>Notification scheduling.</strong> iOS caps local
            notifications at 64. The reminder system supports multiple times
            per day across multiple days of the week, so it needs to validate
            against that limit. 81 tests cover the scheduling logic.
          </p>
        </div>

        {/* Lessons */}
        <h2 className="py-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Lessons Learned
        </h2>
        <p className="text-xs sm:max-w-[80%] sm:text-sm lg:max-w-[90%] lg:text-[16px]">
          Constraint-based systems need extensive testing because the edge
          cases multiply fast. The reminder scheduler alone needed 81 tests to
          feel reliable. Also learned that local-first with MMKV makes the app
          feel instant, but migrating storage formats between versions takes
          real planning.
        </p>
      </div>
    </div>
  );
}
