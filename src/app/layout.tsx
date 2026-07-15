import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "Erin Kerr is a self-taught software engineer building in public. Explore projects like Git Racer, Carpoolio, and Group Sing Along, read the blog, or get in touch.";

export const metadata: Metadata = {
  metadataBase: new URL("https://erinkerr.me"),
  title: {
    default: "Erin Kerr — Software Engineer & Developer Content Creator",
    template: "%s | Erin Kerr",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Erin Kerr — Software Engineer & Developer Content Creator",
    description: siteDescription,
    url: "https://erinkerr.me",
    siteName: "Erin Kerr",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/ek.png",
        width: 225,
        height: 225,
        alt: "Erin Kerr",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Erin Kerr — Software Engineer & Developer Content Creator",
    description: siteDescription,
    images: ["/ek.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://erinkerr.me/#person",
      name: "Erin Kerr",
      url: "https://erinkerr.me",
      jobTitle: "Software Engineer",
      description:
        "Self-taught software engineer and developer content creator building projects in public.",
      image: "https://erinkerr.me/ek.png",
      sameAs: [
        "https://erin-codes.com",
        "https://github.com/ernkerr",
        "https://linkedin.com/in/erinkerr17",
        "https://instagram.com/erin.codes",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://erinkerr.me/#website",
      name: "Erin Kerr",
      url: "https://erinkerr.me",
      description: siteDescription,
      publisher: { "@id": "https://erinkerr.me/#person" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3PHYR9V46Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3PHYR9V46Y');
          `}
        </Script>
        <Script id="easter-egg" strategy="afterInteractive">
          {`
            setTimeout(function() {
              console.log("%c⋆˙⟡ hi there ⟡˙⋆", "color: #60a5fa; font-size: 20px; font-weight: bold;");
              console.log("%c" +
                "⠀⠀⠀⢸⣦⡀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⢸⣏⠻⣶⣤⡶⢾⡿⠁⠀⢠⣄⡀⢀⣴⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⣀⣼⠷⠀⠀⠁⢀⣿⠃⠀⠀⢀⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\\n" +
                "⠴⣾⣯⣅⣀⠀⠀⠀⠈⢻⣦⡀⠒⠻⠿⣿⡿⠿⠓⠂⠀⠀⢀⡇⠀⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠉⢻⡇⣤⣾⣿⣷⣿⣿⣤⠀⠀⣿⠁⠀⠀⠀⢀⣴⣿⣿⠀⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠸⣿⡿⠏⠀⢀⠀⠀⠿⣶⣤⣤⣤⣄⣀⣴⣿⡿⢻⣿⡆⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⠟⠁⠀⢀⣼⠀⠀⠀⠹⣿⣟⠿⠿⠿⡿⠋⠀⠘⣿⣇⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⢳⣶⣶⣿⣿⣇⣀⠀⠀⠙⣿⣆⠀⠀⠀⠀⠀⠀⠛⠿⣿⣦⣤⣀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⠀⣹⣿⣿⣿⣿⠿⠋⠁⠀⣹⣿⠳⠀⠀⠀⠀⠀⠀⢀⣠⣽⣿⡿⠟⠃\\n" +
                "⠀⠀⠀⠀⠀⢰⠿⠛⠻⢿⡇⠀⠀⠀⣰⣿⠏⠀⠀⢀⠀⠀⠀⣾⣿⠟⠋⠁⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⣰⣿⣿⣾⣿⠿⢿⣷⣀⢀⣿⡇⠁⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠉⠁⠀⠀⠀⠀⠙⢿⣿⣿⠇⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⠀⠀⠀⠀⠀⠀⠀\\n" +
                "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀",
                "color: #000000; font-size: 14px; line-height: 1.1;");
              console.log("%cthanks for peeking behind the curtain :-)", "color: #93c5fd; font-size: 14px;");
            }, 2000);
          `}
        </Script>
      </body>
    </html>
  );
}
