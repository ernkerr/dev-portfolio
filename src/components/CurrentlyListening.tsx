import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { geistMono } from "../../public/fonts/fonts";

interface Song {
  title: string;
  artists: string[];
  image_url: string;
  device_type: string;
  device_name: string;
  volume_percent: string;
}

export default function CurrentlyListening() {
  const [isListening, setIsListening] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);

  const defaultSong: Song = {
    title: "Cream on Chrome",
    artists: ["Ratatat"],
    image_url: "/cream_on_chrome.jpg", // put in public folder
    device_type: "",
    device_name: "",
    volume_percent: "",
  };

  const getCurrentlyListening = async () => {
    const res = await fetch("/api/getCurrentlyPlaying");
    const data = await res.json();
    console.log("data: ", data);

    if (data.isPlaying) {
      setIsListening(true);
      if (!currentSong || currentSong.title !== data.item.name) {
        setCurrentSong({
          title: data.title,
          artists: data.artists, // array
          image_url: data.albumImageUrl, //str
          device_type: data.deviceType, //
          device_name: data.deviceName, //
          volume_percent: data.volumePercent,
        });
      }
    } else {
      setIsListening(false);
      setCurrentSong(defaultSong);
      console.log("Nothing is playing right now.");
    }
  };

  // check if I'm listening
  useEffect(() => {
    getCurrentlyListening(); // get current song once when the component mounts
    // const interval = setInterval(getCurrentlyListening, 10000); // Poll every 10 seconds
    const interval = setInterval(getCurrentlyListening, 1000000000); // Poll every 10 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // check if the artist name is too long
  useEffect(() => {
    const checkOverflow = () => {
      if (textRef.current) {
        const isTextOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsOverflowing(isTextOverflowing);
        console.log("Overflow detected:", isTextOverflowing); // Debugging
      }
    };

    // Delay to ensure DOM is fully rendered
    const timeout = setTimeout(checkOverflow, 100);

    // Listen for window resizing
    window.addEventListener("resize", checkOverflow);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", checkOverflow);
    };
  }, [currentSong]);

  return (
    <div
      className={`${geistMono.className} m-1 ml-3 flex h-full w-full flex-col items-start justify-start p-1`}
    >
      {/* SPOTIFY INFO */}
      <div className="text-md mb-2 mt-2 flex flex-row items-center gap-3 p-1">
        <Image
          src={`/spotify.png`}
          alt="SpotifyLogo"
          height={50}
          width={50}
          className="h-[25px] w-[25px] sm:h-[60px]"
        />
        {/* {isListening ? "Currently Listening To..." : "Not currently listening"} */}
        {isListening ? "Now Playing" : "Last Played"}
      </div>

      <div className="flex w-[90%] flex-row items-center rounded-lg border-[1.5px] border-blue-300/50 p-2">
        {currentSong?.image_url && (
          <Image
            src={currentSong.image_url}
            alt={currentSong.title || "No song playing"}
            height={75}
            width={75}
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            className="h-[50px] w-[50px] rounded-lg sm:h-[60px] sm:w-[60px] md:h-[75px] md:w-[75px] lg:h-[85px] lg:w-[85px]"
          />
        )}

        <div className="ml-4 flex flex-col">
          <div
            ref={textRef}
            className="text-md overflow-hidden"
            style={{
              whiteSpace: "nowrap",
              position: "relative",
              maxWidth: "250px",
            }}
          >
            {isOverflowing ? (
              <div
                style={{
                  display: "inline-block",
                  animation: "scroll-text 20s linear infinite",
                }}
              >
                <span style={{ paddingRight: "1rem" }}>
                  {currentSong?.title}
                </span>
                <span style={{ paddingRight: "1rem" }}>
                  {currentSong?.title}
                </span>
              </div>
            ) : (
              // title
              <span>{currentSong?.title}</span>
            )}
          </div>
          <div
            ref={textRef}
            className="overflow-hidden text-sm"
            style={{
              whiteSpace: "nowrap",
              position: "relative",
              minWidth: "250px",
              maxWidth: "250px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                animation: isOverflowing
                  ? "scroll-text 20s linear infinite"
                  : "none",
                transform: isOverflowing ? "translateX(0%)" : "none",
              }}
            >
              <span style={{ paddingRight: "1rem" }}>
                {currentSong?.artists?.join(", ")}
              </span>
              {isOverflowing && (
                <span style={{ paddingRight: "1rem" }}>
                  {currentSong?.artists?.join(", ")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes scroll-text {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}

// font-medium

// TODO:
// Check overflow for title and artist (not for both!)
//   useEffect(() => {
//     const checkOverflow = (ref: React.RefObject<HTMLDivElement>, setter: (value: boolean) => void) => {
//       if (ref.current) {
//         const isOverflowing = ref.current.scrollWidth > ref.current.clientWidth;
//         setter(isOverflowing);
//         console.log("Overflow detected:", isOverflowing);
//       }
//     };

//     const timeout = setTimeout(() => {
//       checkOverflow(titleRef, setIsTitleOverflowing);
//       checkOverflow(artistRef, setIsArtistOverflowing);
//     }, 100);

//     window.addEventListener("resize", () => {
//       checkOverflow(titleRef, setIsTitleOverflowing);
//       checkOverflow(artistRef, setIsArtistOverflowing);
//     });

//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener("resize", () => {
//         checkOverflow(titleRef, setIsTitleOverflowing);
//         checkOverflow(artistRef, setIsArtistOverflowing);
//       });
//     };
//   }, [currentSong]);

//Two Refs: titleRef for the song title, artistRef for the artist names.
// Two States: isTitleOverflowing and isArtistOverflowing to check each independently.
// Independent Overflow Checks: Each section scrolls only if it overflows.
