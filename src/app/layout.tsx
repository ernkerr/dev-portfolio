import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
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

// Serif for the 2026 edition's headlines and card titles.
const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// What people see when erinkerr.me is pasted into an application or a
// message. Words from the header and the homepage headline.
const siteTitle = "Erin Kerr — Product & UI/UX designer + engineer";
const siteDescription =
  "I’m Erin, a designer who engineers. Case studies of my shipped work, from OrderSync’s design system to my App Store apps.";

export const metadata: Metadata = {
  metadataBase: new URL("https://erinkerr.me"),
  title: {
    default: siteTitle,
    template: "%s | Erin Kerr",
  },
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
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
    title: siteTitle,
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
      jobTitle: "Product & UI/UX Designer",
      description:
        "Product and UI/UX designer who engineers: she designs and builds web and mobile apps.",
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
    // Browser extensions add attributes before React loads: dark mode ones
    // put style="color-scheme: light" on <html>, ColorZilla puts
    // cz-shortcut-listen on <body>. This ignores that on <html> and <body>
    // only; mismatches anywhere else still warn.
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
        suppressHydrationWarning
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
              console.log("%c⋆˙⟡ hi there ⟡˙⋆", "color: #A5B1FF; font-size: 20px; font-weight: bold;");
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
              console.log("%cthanks for peeking behind the curtain :-)", "color: #A5B1FF; font-size: 14px;");
            }, 2000);
          `}
        </Script>
      </body>
    </html>
  );
}
