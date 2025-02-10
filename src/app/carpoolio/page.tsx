"use client";

// import DarkModeToggle from "@/components/DarkModeToggle";
// import { pressStart } from "../../../public/fonts/fonts";
// import Image from "next/image";
// import NavBar from "@/components/NavBar";
// import Link from "next/link";
import ProjectTemplate from "@/components/ProjectTemplate";
export default function Carpoolio() {
  return (
    <div>
      <ProjectTemplate
        title="Carpoolio"
        // description="Carpoolio is the first full-stack web application I built, designed to solve a real-world problem while helping me solidify my skills in frontend and backend development. The project started as an experiment in building a practical, user-friendly tool that streamlines carpool planning for groups of friends traveling together. Built with a modern frontend and backend, it allows users to create trips, add vehicles, and assign seats through an intuitive interface."
        description={
          <>
            Carpoolio is the first full-stack web application I built, designed
            to solve a real-world problem while helping me solidify my skills in
            frontend and backend development. The project started as an
            experiment in building a practical, user-friendly tool that
            streamlines carpool planning for groups of friends traveling
            together. Built with people&apos;s real problems in mind, it allows
            users to create trips, add vehicles, and assign seats through an
            intuitive interface.
          </>
        }
        type="Personal Project"
        stack={["React", "Node.js", "Express", "Vercel Postgres"]}
        link="https://carpoolio.co"
        img="/carpoolioLandingPage.png"
        purpose={
          <>
            Planning a trip with multiple cars and passengers can quickly become
            overwhelming, especially when coordination happens through
            fragmented group chats, spreadsheets, or last-minute messages.
            Instead of relying on fragmented messaging, Carpoolio solves this
            problem by <strong>centralizing ride coordination</strong>, making
            group trips smoother and more efficient.
            <br />
            <br />
            Unlike traditional carpooling apps focused on daily commutes or
            ride-sharing with strangers, Carpoolio is tailored for{" "}
            <strong>pre-existing groups</strong>—people who already know each
            other but need a better way to organize their rides. Whether
            it&apos;s a road trip, a festival, or an out-of-town event, the app
            provides a dedicated space to plan rides, assign seats, and ensure
            that everyone knows who they&apos;re traveling with, when
            they&apos;re leaving, and how they&apos;re getting there.
          </>
        }
        stackexp={
          <>
            For Carpoolio, I chose a straightforward tech stack that was easy to
            set up and fit my beginner-level skills while still allowing me to
            learn and experiment with more advanced tools.
            <br />
            <br />
            For the frontend, I opted for <strong>React</strong> for the
            frontend, paired with <strong>Vanilla CSS</strong> for custom
            styling initially, however I ended up installing{" "}
            <strong>Tailwind</strong> because I found it to be less complicated
            than managing classes and css files. <br />
            <br />
            For the backend, I opted for <strong>Node.js</strong> and{" "}
            <strong>Express</strong> to create a robust server-side application
            that handles data storage and retrieval. Vercel Postgres was used
            for the database, providing a scalable and reliable solution for
            storing and querying trip and user data.
            {/* Overall, I aimed for a tech
            stack that was both practical and accessible, giving me room to grow
            as I gained more experience. */}
          </>
        }
        stackimg="/react.png"
        stackimg2="/next.png"
        stackimg3="/vercel.png"
        img2="/carpoolio3.png"
        img3="/carpoolio1.png"
        problems={
          <>
            Since it was my first web application, naturally I ran into lots of
            problems. Early on, I had trouble creating reusable components. It
            was easy to create a one-off component, but making it flexible and
            reusable across the app required thinking about props, state
            management, and keeping things modular.
            <br />
            <br />
            I didn&apos;t realize how important it is to test the application
            across different browsers. Certain styles and features worked fine
            on one browser but caused issues on others, requiring me to tweak
            the CSS and use fallback techniques. I started with Vanilla CSS for
            custom styling, however I ended up installing Tailwind CSS after
            learning it from another project because I found it less complicated
            than managing separate classes and CSS files. While this made
            styling easier, I still considered rewriting some parts for better
            organization. I struggled with organizing components, pages, and
            styles, especially when using pure CSS. Even though I learned about
            CSS variables, which helped simplify the process, it was still tough
            to bounce back and forth between components and their respective
            styles.
            <br />
            <br />
            These challenges were part of the learning process, but with each
            one, I gained a deeper understanding of the web development workflow
            and how to build more efficient and scalable applications.
          </>
        }
        img4="/carpoolioLanding2.png"
        lessons={
          <>
            Knowing what I know now, I would probably have made a more simple
            web app as carpoolio&apos;s functionality is quite complex for a
            first time developer. As the app grew, I found managing state (
            especially user-related data) across multiple components a bit
            difficult. It took me a while to learn the importance of lifting
            state up and prop drilling.
            <br />
            <br />
            One of the key lessons I learned while working on Carpoolio,
            especially in the backend, was the importance of environment
            variables. I needed to add the IP address of the Wi-Fi network I was
            connected to for the backend to function correctly. However, every
            time I worked on Carpoolio from a different location (coffee shops,
            friends’ houses, etc.), I would have to manually update the IP
            address in my configuration files. This process became tedious and
            error-prone, so I learned how to use environment variables to store
            values like IP addresses and API keys. This made my application more
            portable and less dependent on specific environments, helping me
            work across different networks seamlessly.
            <br />
            <br />
            These lessons have really helped me grow as a developer and changed
            the way I approach problems in this project. Handling state,
            environment variables, and debugging has definitely made me more
            efficient. It&apos;s been a journey of figuring out what works best
            for managing complexity and making things run smoothly. Every
            challenge has helped me improve the way I approach building out
            features and handling issues in Carpoolio.
          </>
        }
      />

      {/* 


          <Image
            src="/carpoolio1.png"
            alt="Image 1"
            width={300}
            height={200}
            className="w-1/2"
          />
          <Image
            src="/carpoolio3.png"
            alt="Image 3"
            width={300}
            height={200}
            className="w-1/2"
          />
        </div> */}
      {/* </div> */}
    </div>
  );
}
