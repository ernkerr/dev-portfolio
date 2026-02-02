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
        description={
          <>
            <strong>Status:</strong> The Carpoolio brand was acquired to avoid
            marketplace confusion with another product. As part of that
            acquisition, the app was delisted and the project is no longer
            active. This page documents the work and lessons learned building
            it.
            <br />
            <br />
            Carpoolio was the first full-stack web application I built and
            designed to solve a real-world problem
            <br />
            while helping me solidify my skills in frontend and backend
            development.
            <br />
            <br />
            The project started as an experiment in building a practical,
            user-friendly tool that streamlined
            <br /> carpool planning for groups of friends traveling together.
            <br />
            <br />
            Built with people&apos;s real problems in mind, it allowed users to
            create trips, add vehicles,
            <br />
            and assign seats through a playful interface.
            <br /> 
            Prior to being delisted, Carpoolio was available as both a web
            application and an iOS mobile app, making it easy for groups to
            coordinate rides, plan trips, and assign seats on the go.
            <br />
            coordinate rides on the go. 
         
          </>
        }
        type="Cross-platform"
        stack={[
          "React & React Native",
          "Node.js",
          "Express",
          "Vercel Postgres",
          "Supabase",
        ]}
        link={"https://erinkerr.me/carpoolio"}
        img="/images/carpoolio/carpoolioLandingPage.png"
        purpose={
          <>
            Planning a trip with multiple cars and passengers can quickly become
            overwhelming, especially when coordination happens through
            fragmented group chats, spreadsheets, or last-minute messages.
            Instead of relying on fragmented messaging, Carpoolio solved this
            problem by <strong>centralizing ride coordination</strong>, making
            group trips smoother and more efficient.
            <br />
            <br />
            Unlike traditional carpooling apps focused on daily commutes or
            ride-sharing with strangers, Carpoolio ws tailored for{" "}
            <strong>pre-existing groups</strong>—people who already know each
            other but need a better way to organize their rides. Whether
            it&apos;s a road trip, a festival, or an out-of-town event, the app
            provided a dedicated space to plan rides, assign seats, and ensure
            that everyone knows who they&apos;re traveling with, when
            they&apos;re leaving, and how they&apos;re getting there.
          </>
        }
        stackexp={
          <>
            For Carpoolio, I chose a straightforward tech stack that was easy to
            set up while still allowing me to grow as a developer.
            <br />
            <br />
            For the frontend, I opted for <strong>React</strong>, paired with{" "}
            <strong>Vanilla CSS</strong> for custom styling initially, however I
            ended up installing
            <strong> Tailwind</strong> because I found it to be far less complicated
            than managing classes and css files.
            <br />
            <br />
            For the backend, I used <strong>Node.js</strong> and
            <strong> Express</strong> to build a robust server-side application
            that handled data storage and retrieval.
            <strong> Vercel Postgres</strong> handled the database,
            providing a scalable and reliable solution for storing and querying
            trip and user data.
            <br />
            <br />
            Overall, I aimed for a tech stack that was both practical and
            accessible, giving me room to grow as I gained more experience.
            <br />
            <br />
            When converting it to a mobile app, I switched to{" "}
            <strong> React Native</strong> and <strong> Nativewind</strong> for styling.
          </>
        }
        stackimg="/react.png"
        stackimg2="/node.png"
        stackimg3="/vercel.png"
        img2="/images/carpoolio/trips.png"
        img3="/images/carpoolio/vegas.png"
        problems={
          <>
            Since it was my first web application, naturally I ran into lots of
            problems. Early on, I had trouble creating reusable components. It
            was easy to create a one-off component, but making it flexible and
            reusable across the app required thinking about props, state
            management, and keeping things modular.
            <br />
            <br />
            I didn&apos;t realize how important it was to test the application
            across different browsers (and later devices). Certain styles and
            features worked fine on one browser but caused issues on others,
            requiring me to tweak the CSS and use fallback techniques. I started
            with Vanilla CSS for custom styling, however I ended up installing
            Tailwind CSS after learning it from another project because I found
            it less complicated than managing separate classes and CSS files.
            While this made styling easier, I still considered rewriting some
            parts for better organization. I struggled with organizing
            components, pages, and styles, especially when using pure CSS. Even
            though I learned about CSS variables, which helped simplify the
            process, it was still tough to bounce back and forth between
            components and their respective styles.
            <br />
            <br />
            These challenges were part of the learning process, but with each
            one, I gained a deeper understanding of the web development workflow
            and how to build more efficient and scalable applications.
          </>
        }
        img4="/images/carpoolio/carpoolioLanding2.png"
        lessons={
          <>
            Knowing what I know now, I would probably have made a more simple
            web app as carpoolio&apos;s functionality was quite complex for a
            novice developer. As the app grew, I found managing state (
            especially user-related data) across multiple components a bit
            difficult. It forced me to learn the importance of lifting
            state up and prop drilling.
            <br />
            <br />
            One of the key lessons I learned while working on Carpoolio,
            especially on the backend, was the importance of using environment
            variables. I needed to add the IP address of the Wi-Fi network I was
            connected to for the backend to function properly. However, every
            time I worked on Carpoolio from a different location (coffee shops,
            friend&apos;s houses, etc.), I would have to manually update the IP
            address in my configuration files. This process became tedious and
            error-prone, so I started using environment variables to store
            values like IP addresses and API keys. This made the application more
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
    </div>
  );
}
