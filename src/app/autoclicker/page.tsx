"use client";

import ProjectTemplate from "@/components/ProjectTemplate";
export default function AutoClicker() {
  return (
    <div>
      <ProjectTemplate
        title="AutoClicker"
        description={
          <>
            AutoClicker was the first application I built that was outright
            rejected from the App Store.
            <br />
            <br />
            It&apos;s a simple auto-clicker tool for macOS that lets users set up
            automatic mouse clicks at customizable intervals — useful for idle
            games, repetitive tasks, or accessibility needs.
            <br />
            <br />
            Apple rejected it under Guideline 2.5.1 for using accessibility APIs
            in an &quot;unapproved manner.&quot; Since the app can&apos;t be
            distributed through the Mac App Store, I&apos;m making it available here
            as a direct download.
          </>
        }
        type="Tool"
        stack={["Swift", "SwiftUI", "Accessibility APIs", "Xcode"]}
        link="/downloads/AutoClicker.zip"
        img="/images/autoclicker/autoclicker-main.png"
        purpose={
          <>
            The idea for AutoClicker came from a simple need: automating
            repetitive clicks on macOS. Whether you&apos;re grinding through an idle
            game, testing UI interactions, or have accessibility needs that
            require automated input, there wasn&apos;t a clean native solution
            available.
            <br />
            <br />
            I wanted to build something <strong>lightweight and focused</strong>
            — no bloat, no ads, just a tool that does one thing well. Users can
            configure the click interval, set a target location on screen, and let
            the app handle the rest.
            <br />
            <br />
            The app was fully functional and ready for release, but Apple&apos;s
            review team determined that using accessibility services for
            automated clicking doesn&apos;t align with their intended purpose —
            even though the app itself isn&apos;t malicious or harmful.
          </>
        }
        stackexp={
          <>
            For AutoClicker, I went fully native with <strong>Swift</strong> and{" "}
            <strong>SwiftUI</strong> to build a clean, performant macOS app.
            <br />
            <br />
            The core functionality relies on macOS{" "}
            <strong>Accessibility APIs</strong> (CGEvent) to programmatically generate
            click events. This is the same system that powers assistive technologies
            like Switch Control and Voice Control — legitimate tools for users
            who can&apos;t interact with their devices conventionally.
            <br />
            <br />
            The UI is minimal by design: a settings screen to configure click
            intervals and coordinates, a start/stop toggle, and visual feedback
            showing the click location. SwiftUI made it easy to build a responsive
            menu bar app that stays out of the way until needed.
            <br />
            <br />
            Development was done in VSCode and in <strong>Xcode</strong>, with
            testing on both the simulator and physical devices to ensure the
            accessibility features worked correctly outside the sandbox
            environment.
          </>
        }
        stackimg="/swift.png"
        stackimg2="/swiftui.png"
        stackimg3="/xcode.png"
        img2="/images/autoclicker/autoclicker-settings.png"
        img3="/images/autoclicker/autoclicker-running.png"
        problems={
          <>
            The biggest challenge wasn&apos;t technical — it was navigating
            Apple&apos;s review process. The app worked exactly as intended, but
            Apple&apos;s Guideline 2.5.1 prohibits using public APIs in
            &quot;unapproved&quot; ways.
            <br />
            <br />
            Their specific feedback was that{" "}
            <strong>
              &quot;granting accessibility access to an auto tapper application
              does not align with the intended purpose of accessibility
              services.&quot;
            </strong>
            <br />
            <br />
            This was frustrating because the accessibility APIs are the{" "}
            <em>only</em> way to achieve this functionality on macOS — there&apos;s
            no alternative approach I found that would satisfy both the technical
            requirements and Apple&apos;s guidelines.
            <br />
            <br />
            On the technical side, I had to work through understanding how macOS
            sandboxing affects accessibility permissions, and ensuring the app
            requested the right entitlements.
          </>
        }
        img4="/images/autoclicker/autoclicker-rejection.png"
        lessons={
          <>
            This project taught me a lot about the realities of macOS development
            beyond just writing code.
            <br />
            <br />
            <strong>Platform gatekeeping is real.</strong> You can build
            something fully functional, well-designed, and useful — and still
            get rejected because it doesn&apos;t fit Apple&apos;s vision for
            their platform. It&apos;s a reminder that when you build for
            someone else&apos;s ecosystem, you play by their rules.
            <br />
            <br />
            <strong>Accessibility APIs are powerful but restricted.</strong> macOS
            gives developers access to some incredible system-level features,
            but Apple is protective about how they&apos;re used. Understanding
            the line between &quot;intended&quot; and &quot;unapproved&quot; use
            isn&apos;t always clear until you hit the review process.
            <br />
            <br />
            <strong>Distribution alternatives exist.</strong> Just because an
            app can&apos;t go on the Mac App Store doesn&apos;t mean it can&apos;t
            reach users. Direct distribution outside the App Store is a viable
            option for macOS apps that Apple won&apos;t approve.
            <br />
            <br />
            Despite the rejection, I&apos;m proud of what I built. It works, I still use it all the time, and I learned a ton in the process.
          </>
        }
      />
    </div>
  );
}
