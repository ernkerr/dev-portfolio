"use client";

import ProjectTemplate from "@/components/ProjectTemplate";

export default function myTeaCupboard() {
  return (
    <>
      <ProjectTemplate
        title="My Tea Cupboard"
        description={
          <>
            A platform for tea enthusiasts to track their tea collections and
            share their favorite teas with others.
          </>
        }
        type="Web App"
        stack={["HTML", "CS", "Vanilla JavaScript", "Github Pages"]}
        link="https://ernkerr.github.io/TeaCupboard/index.html"
        img="/images/myTeaCupboard/oolong.jpg"
        purpose={<></>}
        stackexp={
          <>
            My Tea Cupboard is intentionally minimal and highlights a
            fundamental approach
            <br />
            to web development, focusing on core web technologies before
            introducing more
            <br /> complex tools like frameworks or databases.
            <br />
            <br />
            <strong>HTML</strong> Provides the fundamental structure and content
            of the webpage.
            <strong> CSS</strong> Manages the
            <br /> styling and visual presentation, including layout, colors,
            and fonts.
            <br />
            <br />
            <strong>Vanilla JavaScript </strong> Handles all the interactive
            elements and application logic without the
            <br />
            use of external libraries or frameworks.
            <br />
            This includes features like adding, editing, and deleting tea
            entries.
            <br />
            <br />
            <strong>Local Storage</strong> is a browser feature that allows
            websites to
            <br />
            store key-value pairs locally on a user&apos;s machine.
            <br />
            It&apos;s used here to save the list of teas so they persist even
            after the user closes the browser.
            <br />
            <br />I chose <strong>GitHub Pages </strong>
            A free hosting service from GitHub that serves static websites
            directly <br /> from a repository. It&apos;s perfect for projects
            like this that don&apos;t require server-side processing.
          </>
        }
        stackimg="/JS.png"
        stackimg2="/HTML5.png"
        stackimg3="/GithubPages.png"
        img2="/images/myTeaCupboard/teas.png"
        img3="/images/myTeaCupboard/newCupboard.png"
        problems={<></>}
        img4="/images/myTeaCupboard/landingPage.png"
        lessons={
          <>
            <br />
            <br />
          </>
        }
      />
    </>
  );
}
